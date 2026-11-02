# Olivia Johnson: interactive resume

A plain HTML, CSS and JavaScript site. There's nothing to install or build: double-click `index.html` to open it.

## Swap in node photos

Save each photo in `images/` with these exact names:

| Node | File |
| --- | --- |
| People Ops & Learning & Development | `images/node-people-ops.jpg` |
| RA | `images/node-ra.jpg` |
| Teaching | `images/node-teaching.jpg` |
| Summer Camps | `images/node-summer-camps.jpg` |
| Community Building | `images/node-community-events.jpg` |

- The photo appears automatically. Until the file exists, the node shows its colored placeholder.
- Names must match exactly once published: GitHub Pages treats `Photo.JPG` and `photo.jpg` as different files. If your file ends in `.jpeg` or `.png`, either rename it or change the `photo` path in `js/nodes.js`.
- Update the node's `photoAlt` in `js/nodes.js` so it describes the actual photo.

The circle crops the photo to fit, so keep faces near the middle. The opened card shows the whole photo.

## Edit blurbs and line lengths

Everything is in the `NODES` list at the top of `js/nodes.js`. Each node has its own block:

```js
label: "Teaching",        // text on the node, and the card's title
blurb: "At Jubilee...",   // paragraph in the opened card
angle: 170,               // direction: 0 = right, 90 = down, 180 = left, 270 = up
length: 0.75,             // line length, where 1.0 is the longest
```

Keep the quotation marks around text, and the comma at the end of each line. If you use a `"` inside a blurb, write it as `\"`.

## Publish on GitHub Pages

1. Create a new public repository on [GitHub](https://github.com/new). Naming it `<your-username>.github.io` gives you the shortest address.
2. On the repository page, choose **Add file → Upload files** and drag in everything in this folder, keeping `css`, `js` and `images` as folders. Leave out `Headshot.jpeg` and `Olivia Johnson – Resume.pdf`, since the site uses its own copies of them. `index.html` must be at the top level. Commit the upload.
3. Go to **Settings → Pages**. Under **Build and deployment**, set the source to **Deploy from a branch**, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or two, the site is live at `https://<your-username>.github.io/` (or `https://<your-username>.github.io/<repository-name>/` with any other repository name).

To make changes later, upload the edited file again or use the pencil icon on GitHub. The site updates itself.
