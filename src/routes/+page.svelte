<script lang="ts">
    import Button from "@smui/button";
    import Card, {Actions, Content} from "@smui/card";
    import {Label} from "@smui/tab";
    import HelperText from "@smui/textfield/helper-text";
    import Textfield from "@smui/textfield";
    import {login, register} from "$lib/firebase.js";
    import {goto} from "$app/navigation";

    let wantsToRegister = false;

    let email:string|null = "";
    let password:string|null = "";
    let helperText:string|null = null;
    function handleRegister() {
        if (password?.length < 8) {
            helperText = "make password at least 8 characters"
        }
        else if (!/\d/.test(password!)){
            helperText = "password must contain at least 1 number"
        }
    else {
            register(email, password).then(resp => {
                if (!resp) helperText="something went wrong... try again later"
                else goto('/welcome');
            })
        }
    }

    function handleLogin() {
        //todo may be undefined?
        login(email!, password!).then(resp => {
            if (!resp) helperText="wrong credentials"
            else goto('/welcome');
        })
    }
</script>

<div>
    <Card variant="outlined" padded>
        <Content>
            <h3>{wantsToRegister ? "NEW USER" : "LOGIN"}</h3>
            <Textfield
                    class="text-field"
                    type="email"
                    bind:value={email}
                    label="Email"
                    input$autocomplete={wantsToRegister ? false : "email"}
            >
                <HelperText validationMsg slot="helper">
                    Email is not valid.
                </HelperText>
            </Textfield>
            <Textfield
                    class="text-field"
                    type="password"
                    bind:value={password}
                    label="Password"
                    input$autocomplete={wantsToRegister ? false : "password"}
            >
                <HelperText persistent slot="helper">
                    {helperText ? helperText : ''}
                </HelperText>
            </Textfield>
        </Content>
        <Actions>
            <Button on:click={() => wantsToRegister=!wantsToRegister}>
                <Label>Take me to {wantsToRegister ? "login" : "registration"}</Label>
            </Button>
            <Button on:click={() => wantsToRegister ? handleRegister() : handleLogin()}>
                <Label>Proceed</Label>
            </Button>
        </Actions>
    </Card>
</div>