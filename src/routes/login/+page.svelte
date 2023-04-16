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
<!-- <div class="authContainer">
    <form>
        <h1>{register ? "Register" : "Login"}</h1>
        {#if error}
            <p class="error">The Information You Have Entered Is Not Correct</p>
        {/if}
        <label>
            <p class={phoneNumber ? 'above' : 'center'}>Phone Number</p>
            <input bind:value={phoneNumber} type="tel" name="phone" id="phone" placeholder="Phone Number" disabled={submitSuccessful}>
        </label>
        {#if confirmation}
            <label>
                <p class={code ? 'above' : 'center'}>Code</p>
                <input bind:value={code} type="text" name="code" id="code" placeholder="Code">
            </label>
        {/if}
        <div id="sign-in-button"></div>
        {#if confirmation}
            <button type="button" on:click={onsubmit}>Submit</button>
        {:else}
            <button type="button" on:click={handleAuthenticate}>Submit</button>
        {/if}
    </form>
</div> -->
    



<!-- <style>
.authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 24px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
}

form, .options{
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
}

form input {
    width: 100%;
}

h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 500;
}

form label {
    position: relative;
    border: 1px solid navy;
    border-radius: 5px;
}

form label:focus-within {
    border: blue;
}

form input {
    border: none;
    background: transparent;
    color: white;
    padding: 14px;
}

form input:focus {
    outline: none;
    border: none;
}
button {
    background: navy;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

form button:hover{
    background: blue;
}

.above, .center {
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
    color: white;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 0.8rem;
}   

.above {
    top: 0;
    left: 24px;
    background: navy;
    border: 1px solid blue;
    font-size: 0.7rem;
}

.center {
    top: 50%;
    left: 6px;
    border: 1px solid transparent;
    opacity: 0;
}

.error {
    color: coral;
    font-size: 0.9rem;
    text-align: center;
}

.options{
    padding: 14px 0;
    overflow: hidden;
    /* width: 100%; */
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.options > p {
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    padding: 0 8px;
}

.options > p::after,
.options > p::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background: white;
}

.options > p::after {
    right: 100%;
}

.options > p::before {
    left: 100%;
}

.options div {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
}

.options div p:last-of-type {
    cursor: pointer;
    font-weight: 500;
    color: cyan;
}

</style> -->