import { Routes } from "@angular/router";
import { FishComponent } from "./fish/fish.component";
import { DetailsComponent } from "./details/details.component";
import { FormComponent } from "./form/form.component";

const routeConfig: Routes = [
    {
        path: '',
        component: FishComponent,
        title: 'Homepage',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details'
    },
    {
        path: 'create-a-post',
        component: FormComponent,
        title: 'Create a post'
    }
];

export default routeConfig;