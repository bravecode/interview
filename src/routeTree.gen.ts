/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShareIndexImport } from './routes/share/index'
import { Route as DefaultIndexImport } from './routes/_default/index'
import { Route as StationsStationIDImport } from './routes/stations/$stationID'

// Create/Update Routes

const ShareIndexRoute = ShareIndexImport.update({
  id: '/share/',
  path: '/share/',
  getParentRoute: () => rootRoute,
} as any)

const DefaultIndexRoute = DefaultIndexImport.update({
  id: '/_default/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StationsStationIDRoute = StationsStationIDImport.update({
  id: '/stations/$stationID',
  path: '/stations/$stationID',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/stations/$stationID': {
      id: '/stations/$stationID'
      path: '/stations/$stationID'
      fullPath: '/stations/$stationID'
      preLoaderRoute: typeof StationsStationIDImport
      parentRoute: typeof rootRoute
    }
    '/_default/': {
      id: '/_default/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DefaultIndexImport
      parentRoute: typeof rootRoute
    }
    '/share/': {
      id: '/share/'
      path: '/share'
      fullPath: '/share'
      preLoaderRoute: typeof ShareIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/stations/$stationID': typeof StationsStationIDRoute
  '/': typeof DefaultIndexRoute
  '/share': typeof ShareIndexRoute
}

export interface FileRoutesByTo {
  '/stations/$stationID': typeof StationsStationIDRoute
  '/': typeof DefaultIndexRoute
  '/share': typeof ShareIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/stations/$stationID': typeof StationsStationIDRoute
  '/_default/': typeof DefaultIndexRoute
  '/share/': typeof ShareIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/stations/$stationID' | '/' | '/share'
  fileRoutesByTo: FileRoutesByTo
  to: '/stations/$stationID' | '/' | '/share'
  id: '__root__' | '/stations/$stationID' | '/_default/' | '/share/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  StationsStationIDRoute: typeof StationsStationIDRoute
  DefaultIndexRoute: typeof DefaultIndexRoute
  ShareIndexRoute: typeof ShareIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  StationsStationIDRoute: StationsStationIDRoute,
  DefaultIndexRoute: DefaultIndexRoute,
  ShareIndexRoute: ShareIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/stations/$stationID",
        "/_default/",
        "/share/"
      ]
    },
    "/stations/$stationID": {
      "filePath": "stations/$stationID.tsx"
    },
    "/_default/": {
      "filePath": "_default/index.tsx"
    },
    "/share/": {
      "filePath": "share/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
