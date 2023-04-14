<script lang="ts">
    import {Collection, Doc, User} from "sveltefire";
    import {docStore} from "sveltefire";
    import {firestore, addUserData} from "$lib/firebase.ts";
    import {onMount} from "svelte";
    import Accordion, {Panel, Header, Content} from "@smui-extra/accordion";
    import Textfield from "@smui/textfield";
    import Slider from '@smui/slider';
    import FormField from '@smui/form-field';
    import Chip, { Set, Text } from '@smui/chips';
    import Button, {Label}from "@smui/button";
    import LinearProgress from '@smui/linear-progress';
    import Snackbar, {Label as SnackbarLabel}from '@smui/snackbar';
    import IconButton, { Icon } from '@smui/icon-button';


    let timestamp = new Date();
    interface daysData {
        selected: string[]
        feels: number,
        remark: string
    }

    let day: daysData = {
        selected: [],
        feels: 0,
        remark: ' '
    };
    let listOfPreviousDays: daysData[];
    const chips = ['breakfast', 'elevenses', 'lunch', 'supper', 'dinner'];
    let initSnackbar: Snackbar;
    let saveSnackbar: Snackbar;

    onMount(() => {
        const timestampFromLocalStorage = localStorage.getItem('timestamp');
        if (timestampFromLocalStorage) {
            let dateToday = timestamp.toISOString().split("T")[0];
            let storedDate = timestampFromLocalStorage.split("T")[0];
            if (new Date(dateToday) > new Date(storedDate)) {
                addUserData('eating', timestamp.toISOString().split("T")[0], JSON.parse(localStorage.getItem('day'))).then(resp => {
                    if (!resp) {
                        // todo store to localstorage as list of non synced data
                    }
                })
            }
            else day = JSON.parse(localStorage.getItem('day'));
        }
        initSnackbar.open();
    })

    function save() {
        localStorage.setItem('timestamp', timestamp.toISOString());
        localStorage.setItem('day', JSON.stringify(day));
        saveSnackbar.open();
    }

    function addRemark(chip:string){
        let chipRow = day.remark.split("\n").find(row => { return row.startsWith(chip+": ")})
        if (chipRow) {
            day.remark = day.remark.replace(chipRow, '').split("\n").filter(empty => empty !== "").join("\n");
        }
        else day.remark += day.remark.length === 0 ? chip+": " :"\n"+chip+": "
    }

</script>

<div>
    <User let:user>
        <div class="form">
            <Set chips={chips} let:chip filter bind:selected={day.selected}>
                <Chip {chip} touch on:click={() => addRemark(chip)}>
                    <Text>{chip}</Text>
                </Chip>
            </Set>
            <FormField>
                <span slot="label">How do you feel?</span>
                <Slider min={0} max={10} step={1} discrete tickMarks bind:value={day.feels} style="width: 100%"></Slider>
            </FormField>
            <Textfield input$rows={5} textarea label="Remarks" bind:value={day.remark}></Textfield>
            <Button on:click={() => save()} variant="raised" class="top-margin">
                <Label>Save</Label>
            </Button>
        </div>

        <Accordion multiple class="top-margin">
            <Collection ref={`users/${user.uid}/eating`} let:data>
                {#each data as d}
                    <Panel>
                        <Header>{d.id}</Header>
                        <Content>
                            <div style="display: flex; justify-content: space-around">
                                {#each chips as chip}
                                    {#if (d.selected.find(item => item === chip))}
                                        <IconButton disabled>
                                            <Icon class="material-icons">star</Icon>
                                        </IconButton>
                                    {:else}
                                        <IconButton disabled>
                                            <Icon class="material-icons">star_outline</Icon>
                                        </IconButton>
                                    {/if}
                                {/each}
                            </div>
                            <LinearProgress progress={d.feels/10} />
                            <p>
                                !! {d.remark} !!
                            </p>
                        </Content>
                    </Panel>
                {/each}
            </Collection>
        </Accordion>
    </User>
    <Snackbar bind:this={initSnackbar}>
        <SnackbarLabel>Remember to save selected items!</SnackbarLabel>
    </Snackbar>
    <Snackbar bind:this={saveSnackbar}>
        <SnackbarLabel>History will be updated tomorrow. Keep updating today's list!</SnackbarLabel>
    </Snackbar>
</div>

<style>
    .form {
        display: flex;
        flex-direction: column;
    }
    :global(.top-margin) {
        margin-top: 10px;
    }
    :global(.mdc-linear-progress__bar-inner) {
        border-color: green;
    }
    :global(button:disabled) {
        color: #ff3e00 !important;
    }
</style>
