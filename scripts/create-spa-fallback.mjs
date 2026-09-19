import { copyFile, mkdir, readFile } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");

const sitemap = await readFile("public/sitemap.xml", "utf8");
const siteOrigin = "https://vaidyamhealthcare.in";
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
	.map((match) => match[1].trim())
	.filter((url) => url.startsWith(siteOrigin))
	.map((url) => new URL(url).pathname)
	.filter((pathname) => pathname !== "/");

for (const route of routes) {
	const routeDirectory = `dist${route}`;
	await mkdir(routeDirectory, { recursive: true });
	await copyFile("dist/index.html", `${routeDirectory}/index.html`);
}