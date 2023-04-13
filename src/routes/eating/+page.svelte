<script lang="ts">
    import {User} from "sveltefire";
    import {docStore} from "sveltefire";
    import {firestore, addUserData} from "$lib/firebase.ts";
    import {onMount} from "svelte";

    interface daysData {
        timestamp: Date,
        breakfast: boolean,
        beforeLunch: boolean,
        lunch: boolean,
        afterLunch: boolean,
        dinner: boolean,
        feels?: number,
        remark?: string
    }

    let day: daysData;
    let listOfPreviousDays: daysData[];

    onMount(() => {
        const dayFromLocalStorage = localStorage.getItem('day');
        day = dayFromLocalStorage ? JSON.parse(dayFromLocalStorage) : {
            timestamp: new Date(),
            breakfast: false,
            beforeLunch: false,
            lunch: false,
            afterLunch: false,
            dinner: false,
        } as daysData
        let dateToday = new Date().toISOString().split("T")[0]
        if (new Date(dateToday) > new Date(day.timestamp.toISOString().split("T")[0])) {
            addUserData(day).then(resp => {
                if (resp) {
                    // todo fetch once again
                }
                else {
                    // todo store to localstorage as list of non synced data
                }
            })
        }
        //todo store in localstorage until next day then addDaysData
    })

    // todo save changes

    function save() {
        // todo save to localstorage
    }
</script>

<User let:user>

</User>