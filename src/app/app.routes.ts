import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("../pages/converter/converter.page").then((m) => m.ConverterPage),
  },
  { path: "**", redirectTo: "" },
];
