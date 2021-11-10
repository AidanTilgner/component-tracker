
/**
 * @roxi/routify 2.18.3
 * File generated Wed Nov 10 2021 00:07:04 GMT-0800 (Pacific Standard Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2021-11-10T08:07:04.513Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": false,
      "isDir": true,
      "file": "example",
      "filepath": "/example",
      "name": "example",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/component-tracker/src/pages/example",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[example].svelte",
          "filepath": "/example/[example].svelte",
          "name": "[example]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/component-tracker/src/pages/example/[example].svelte",
          "importPath": "../src/pages/example/[example].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/example/:example",
          "id": "_example__example",
          "component": () => import('../src/pages/example/[example].svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/example/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/component-tracker/src/pages/example/index.svelte",
          "importPath": "../src/pages/example/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/example/index",
          "id": "_example_index",
          "component": () => import('../src/pages/example/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/example"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/component-tracker/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

