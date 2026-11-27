# Where Is Justin?

A small, static travel page for GitHub Pages. The country outline is fetched automatically from public map data, so there are no country images to upload.

## Update the location

Open `app.js` and change the `country` value near the top:

```js
const currentStop = {
  country: "Japan",
  note: "",
};
```

Use a country name such as `Portugal`, `Canada`, or `Japan`. Optionally add a short `note`. Save and push the change to GitHub; Pages will publish it automatically.

## Publish with GitHub Pages

1. Put these files in the root of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select your main branch and the `/ (root)` folder.
4. Save. GitHub will show the site address in the Pages settings after it publishes.

The site uses D3 Geo from jsDelivr and country boundaries from the `datasets/geo-countries` public dataset. Both are loaded in the visitor’s browser; no build step is needed.
