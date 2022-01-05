
/**
 * @roxi/routify 2.18.3
 * File generated Tue Dec 28 2021 19:23:20 GMT-0800 (Pacific Standard Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2021-12-29T03:23:20.350Z"

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
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/index.svelte",
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
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/projects",
      "children": [
        {
          "isFile": false,
          "isDir": true,
          "file": "[project]",
          "filepath": "/projects/[project]",
          "name": "[project]",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/projects/[project]",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "[component].svelte",
              "filepath": "/projects/[project]/[component].svelte",
              "name": "[component]",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/projects/[project]/[component].svelte",
              "importPath": "../src/pages/projects/[project]/[component].svelte",
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
              "path": "/projects/:project/:component",
              "id": "_projects__project__component",
              "component": () => import('../src/pages/projects/[project]/[component].svelte').then(m => m.default)
            },
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/projects/[project]/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/projects/[project]/index.svelte",
              "importPath": "../src/pages/projects/[project]/index.svelte",
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
              "path": "/projects/:project/index",
              "id": "_projects__project_index",
              "component": () => import('../src/pages/projects/[project]/index.svelte').then(m => m.default)
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
          "path": "/projects/:project"
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/projects/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/projects/index.svelte",
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
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "testing",
      "filepath": "/testing",
      "name": "testing",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/testing",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/testing/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/testing/index.svelte",
          "importPath": "../src/pages/testing/index.svelte",
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
          "path": "/testing/index",
          "id": "_testing_index",
          "component": () => import('../src/pages/testing/index.svelte').then(m => m.default)
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
      "path": "/testing"
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

