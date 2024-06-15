/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

export default {
	async fetch(request:any, env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname === "/api/key") {
			// first , get last used key id from lastusedkey table
			const { results: lastusedkey } = await env.DB.prepare(
				"SELECT * FROM lastusedkey "
			).all();

			//get next id and apikey from apikey table that is greater than the last used key id
			const { results: nextKeyResult } = await env.DB.prepare(
				"SELECT id, apikey FROM apikey WHERE id > ? ORDER BY id ASC LIMIT 1"
			).bind(lastusedkey[0].keyid).all();

			let nextKey;
			if (nextKeyResult.length > 0) {
				// If there is an id greater than the last used key id, use it
				nextKey = nextKeyResult[0];
			} else {
				// If there is no id greater than the last used key id, start from the smallest id
				const { results: minKeyResult } = await env.DB.prepare(
					"SELECT id, apikey FROM apikey ORDER BY id ASC LIMIT 1"
				).all();
				nextKey = minKeyResult[0];
			}

			// Update lastusedkey table with the new id
			await env.DB.prepare(
				"UPDATE lastusedkey SET keyid = ?"
			).bind(nextKey.id).run();

			// Return the next key as a JSON object
			return Response.json({  apikey: nextKey.apikey });

		}

		//add a api key to the apikey table /api/addkey
		if (pathname === "/api/addkey") {
			// Get the uploaderid from the request body
			const { uploaderid,apikey } = await request.json();
			// check if api key is valid , if so it will return a response 200
			const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apikey}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					contents: [
						{
							role: "user",
							parts: [
								{ text: "Give me five subcategories of jazz?" }
							]
						}
					]
				})
			});

			// Parse the response as JSON
			const data = await res.json();
			// If the response is not valid, return an error message by status code
			if (res.status !== 200) {
				return new Response(JSON.stringify({error: "Invalid API key"}));
			}
			// console.log(data?.contents[0]?.parts[0]?.text);
			



			//check if api key already exists
			const { results: existingKey } = await env.DB.prepare(
				"SELECT * FROM apikey WHERE apikey = ?"
			).bind(apikey).all();
			if (existingKey.length > 0) {
				return  Response.json({error:"API key already exists"});
			}
			// Insert a new api key into the apikey table
			await env.DB.prepare(
				"INSERT INTO apikey (apikey, uploaderid) VALUES (?, ?)"
			).bind(apikey, uploaderid).run();

			// Return a success message
			return  Response.json({res:"API key added successfully"});
		}

		//get all the users from the user table

		return new Response(
			"Call /api/beverages to see everyone who works at Bs Beverages"
		);
	},
} satisfies ExportedHandler<Env>;



// db.ts
// -- Create the apikey table with id auto increment, apikey text, and uploaderid integer in SQLite
// CREATE TABLE IF NOT EXISTS apikey (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     apikey TEXT,
//     uploaderid INTEGER
// );

// -- Create the lastusedkey table with id auto increment, keyid integer, and userid integer
// CREATE TABLE IF NOT EXISTS lastusedkey (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     keyid INTEGER,
//     userid INTEGER
// );

// -- Create the user table with id auto increment, username text, and email text
// CREATE TABLE IF NOT EXISTS user (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT,
//     email TEXT
// );

// -- npx wrangler d1 execute aiAPI --local --file=./schema.sql --
// -- npx wrangler d1 execute aiAPI --remote --file=./schema.sql --