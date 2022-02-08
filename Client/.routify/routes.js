
/**
 * @roxi/routify 2.18.3
 * File generated Mon Feb 07 2022 23:42:09 GMT-0800 (Pacific Standard Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2022-02-08T07:42:09.168Z"

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
      "file": "home",
      "filepath": "/home",
      "name": "home",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/home",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/home/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/home/index.svelte",
          "importPath": "../src/pages/home/index.svelte",
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
          "path": "/home/index",
          "id": "_home_index",
          "component": () => import('../src/pages/home/index.svelte').then(m => m.default)
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
      "path": "/home"
    },
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
      "file": "organizations",
      "filepath": "/organizations",
      "name": "organizations",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/organizations",
      "children": [
        {
          "isFile": false,
          "isDir": true,
          "file": "[organization]",
          "filepath": "/organizations/[organization]",
          "name": "[organization]",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/organizations/[organization]",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/organizations/[organization]/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/organizations/[organization]/index.svelte",
              "importPath": "../src/pages/organizations/[organization]/index.svelte",
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
              "path": "/organizations/:organization/index",
              "id": "_organizations__organization_index",
              "component": () => import('../src/pages/organizations/[organization]/index.svelte').then(m => m.default)
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
          "path": "/organizations/:organization"
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/organizations/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/organizations/index.svelte",
          "importPath": "../src/pages/organizations/index.svelte",
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
          "path": "/organizations/index",
          "id": "_organizations_index",
          "component": () => import('../src/pages/organizations/index.svelte').then(m => m.default)
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
      "path": "/organizations"
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "profile",
      "filepath": "/profile",
      "name": "profile",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/profile",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/profile/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/profile/index.svelte",
          "importPath": "../src/pages/profile/index.svelte",
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
          "path": "/profile/index",
          "id": "_profile_index",
          "component": () => import('../src/pages/profile/index.svelte').then(m => m.default)
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
      "path": "/profile"
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
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "users",
      "filepath": "/users",
      "name": "users",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/users",
      "children": [
        {
          "isFile": false,
          "isDir": true,
          "file": "login",
          "filepath": "/users/login",
          "name": "login",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/users/login",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/users/login/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/users/login/index.svelte",
              "importPath": "../src/pages/users/login/index.svelte",
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
              "path": "/users/login/index",
              "id": "_users_login_index",
              "component": () => import('../src/pages/users/login/index.svelte').then(m => m.default)
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
          "path": "/users/login"
        },
        {
          "isFile": false,
          "isDir": true,
          "file": "signup",
          "filepath": "/users/signup",
          "name": "signup",
          "ext": "",
          "badExt": false,
          "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/users/signup",
          "children": [
            {
              "isFile": true,
              "isDir": false,
              "file": "index.svelte",
              "filepath": "/users/signup/index.svelte",
              "name": "index",
              "ext": "svelte",
              "badExt": false,
              "absolutePath": "C:/Coding/Web Development/Framework Component Tracker/Client/src/pages/users/signup/index.svelte",
              "importPath": "../src/pages/users/signup/index.svelte",
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
              "path": "/users/signup/index",
              "id": "_users_signup_index",
              "component": () => import('../src/pages/users/signup/index.svelte').then(m => m.default)
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
          "path": "/users/signup"
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
      "path": "/users"
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

