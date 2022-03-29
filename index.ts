// https://api.jspm.io/generate

const assignedMap = {
	imports : {
		"__bundler__": "./bundler.js"
	},
	scopes : {
		
	}
};

const apiBody = {
	install: [
		"react@^17.0.2",
		"react-dom@^17.0.2",
		"@mantine/core@^4.1.0",
		"@mantine/hooks@^4.1.0"
	],
	inputMap: {
		imports : {		
			// "__bundler__": "./bundler.js",
			"@radix-ui/react-context": "https://cdn.jsdelivr.net/npm/@radix-ui/react-context/dist/index.module.js"
		},
		scopes: {
			"https://ga.system.jspm.io/": {
			}
		}
	},
	provider: "jspm.system",
	graph: true
};

async function main() {

	const fetch = (await import("node-fetch")).default;
	const fs = (await import("fs")).default;


	// console.log(fs);

	// const fetch = fetchModule.default;

	let resp: any;

	try {

		const result = await fetch("https://api.jspm.io/generate", {
			method: "POST",
			body: JSON.stringify(apiBody)
		});

		console.log(result.ok);

		resp = await result.json();
		console.log(resp);

		if (resp && resp.error) throw resp.error;

		console.log("==== WRITE MAP ====");

		const { map } = resp;

		map.imports && Object.assign(map.imports, assignedMap.imports);
		map.scopes && Object.assign(map.scopes, assignedMap.scopes);

		await fs.writeFile(
			"importsmap.json", 
			JSON.stringify(map, null, 3), 
			{},
			err => console.log(err)
		);


		console.log(map);
		// 

	}
	catch (error) {
		console.error("err", error);
	}

}

main();