<script>
    import Card, {MediaContent, Media} from "@smui/card";
    export const image = "image";
</script>

<div>
    <Card>
        <Media aspectRatio="square" class="bg-image">
            <MediaContent>
                <h2
                        class="mdc-typography--headline6"
                        style="color:rgba(255,255,255, .7);position: absolute; bottom: 0; left: 0; margin: 0; padding: 5px; background-color: rgba(0, 0, 0, .3)"
                >
                    A card with 16x9 media. how long could this MediaContent be?... looks very shitty. maybe make it transparent?
                </h2>
            </MediaContent>
        </Media>
    </Card>
</div>

<style>
    :global(.bg-image) {
        background-image: url("https://i.redd.it/s7ix2fhj3os41.jpg");
    }
</style>