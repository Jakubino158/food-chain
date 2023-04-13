<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import {page} from "$app/stores";

    import { FirebaseApp } from "sveltefire";

    import { firestore, auth } from '$lib/firebase';

    let tabs = [
        {name: 'Welcome :)', route: '/welcome'},
        {name: 'Eating', route: '/eating'},
        {name: 'Workouts', route: '/workouts'},
    ];
    let reloadedPage = tabs.find(tab => tab.route === $page.url.pathname)
    let active: {name:string, route:string} = reloadedPage ? reloadedPage : auth.currentUser ? tabs[0] : {name:'', route:'/'};


</script>



<div class="center">
    <FirebaseApp {auth} {firestore}>
        <div class="content">
            <div>
                <TabBar tabs={tabs} let:tab bind:active>
                    <Tab {tab} href={tab.route}>
                        <Label>{tab.name}</Label>
                    </Tab>
                </TabBar>
            </div>
            <slot />
        </div>
        <div slot="signedOut">
            <slot />
        </div>
    </FirebaseApp>
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .content {
        display: flex;
        flex-direction: column;
    }
    .content div {
        padding-bottom: 1em;
    }
    :global(.text-field) {
        min-width: 250px;
    }
</style>