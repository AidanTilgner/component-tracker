
/**
 * @roxi/routify 2.18.3
 * File generated Wed Nov 24 2021 23:56:34 GMT-0800 (Pacific Standard Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2021-11-25T07:56:34.318Z"

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
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/src/pages/index.svelte",
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
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "projects",
      "filepath": "/projects",
      "name": "projects",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/src/pages/projects",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[project].svelte",
          "filepath": "/projects/[project].svelte",
          "name": "[project]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/src/pages/projects/[project].svelte",
          "importPath": "../src/pages/projects/[project].svelte",
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
          "path": "/projects/:project",
          "id": "_projects__project",
          "component": () => import('../src/pages/projects/[project].svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/projects/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/src/pages/projects/index.svelte",
          "importPath": "../src/pages/projects/index.svelte",
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
          "path": "/projects/index",
          "id": "_projects_index",
          "component": () => import('../src/pages/projects/index.svelte').then(m => m.default)
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
      "path": "/projects"
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

