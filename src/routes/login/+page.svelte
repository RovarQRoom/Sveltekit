<script lang="ts">
	import { authHandlers, authStore } from "../../store/store";
    import { Label, Input, InputAddon, ButtonGroup } from 'flowbite-svelte'
    import { Button, Modal } from 'flowbite-svelte'
    import {phone} from 'phone';

   

    let phoneNumber: any | null;
    let error = false;
    let register = false;
    let confirmation: any | undefined;
    let code :string  | undefined;
    let submitSuccessful = false;

    function handleAuthenticate() {
        phoneNumber = phone(`+964${phoneNumber}`, {country:'IRQ'}).phoneNumber;
        
        if(!phoneNumber || (register)) {
            error = true;
        } else {
            error = false;
        }
            try {
                authHandlers.signup(phoneNumber);
                submitSuccessful = true;
            } catch (error) {
                console.log(error);
                error = true;
            }
    }

    $: {
        const {confirmationResult} = $authStore;
        if(confirmationResult) {
           confirmation = confirmationResult;
        }
    }

  function  onsubmit()  {
        if(confirmation && code){
            authHandlers.confirm( code,confirmation);
        }
    }
</script>



<img class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800 m-auto block ml-auto mr-auto mt-80 w-0.5/4" src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn=w240-h480-rw" alt="image description">

<form>
    <div class="mb-6 max-w-xl flex flex-col m-auto py-5">
        <Label for="website-admin" class="block mb-2">Phone Number</Label>
        <ButtonGroup class="w-full">
          <InputAddon>
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </InputAddon>
          {#if error}
            <p class="error">The Information You Have Entered Is Not Correct</p>
            {/if}
          <Input id="website-admin" bind:value={phoneNumber} placeholder="7731554024"/>
          {#if confirmation}
          <Modal bind:open={submitSuccessful} size="xs" autoclose>
            <div class="text-center">
                OTP Code
                <Input id="website-admin" bind:value={code} placeholder="000000"/>
                <Button color="green" on:click={onsubmit} class="m-4">Submit</Button>
            </div>
          </Modal>
        {/if}
        <div id="sign-in-button"></div>
        <button type="button" class="pr-3 pl-3 transition-all hover:bg-green-200 rounded-t-sm rounded-b-sm rounded-r-sm" on:click={handleAuthenticate}>Submit</button>
        </ButtonGroup>
      </div>
</form>