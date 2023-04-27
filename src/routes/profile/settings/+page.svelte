<script lang="ts">

	import { Avatar, Button, Fileupload, Input, Label } from "flowbite-svelte";
	import { authStore, imageHandlers, profileHandlers } from "../../../store";
	import { ProfileUpdateDTO } from "../../../components/Dtos/Profile.DTO";
	import { onMount } from "svelte";
	import { auth } from "../../../components/lib/firebase/firebase";
	import { goto } from "$app/navigation";

    let userDetails = {
        name: auth.currentUser?.displayName || "",
        email: auth.currentUser?.email || "",
        profileImage: auth.currentUser?.photoURL || "",
        updatedAt: new Date(),
    };
    let fileUpload: File;

    async function updateProfile(){
      let imageURL = await imageHandlers.uploadImage(fileUpload);
        const UserDTO = new ProfileUpdateDTO(
            userDetails.name,
            userDetails.email,
            imageURL,
            userDetails.updatedAt,
        );
        try{
          await profileHandlers.updateProfile(UserDTO);
          goto('/dashboard');
        }catch(error){
          console.log(error);
        }
    }

    function pictureUpdate(event: any) {
      const img = document.querySelector('#image');
      const files = document.querySelector('#files') as HTMLInputElement;

      files.addEventListener('change', function() {
        
          // this refer to the file
          if(this.files === null) {
              return;
          }
          const choosedFile = this.files[0] || null;
          fileUpload = choosedFile;
          
          console.log("File Chosen",choosedFile);
          
          if (choosedFile) {
              const reader = new FileReader();

              reader.addEventListener('load', function() {
                  if(img === null) {
                      return;
                  }
                  img?.setAttribute('src', reader.result as string);
              });
              reader.readAsDataURL(choosedFile);
          }
      })
  }
</script>
<form class="m-2">
    <div class="profile-img my-3">
        <Label class="pb-2" for='small_size' >Profile Image</Label>
        <div class="flex space-x-4 m-3">
          {#if userDetails.profileImage}
            <Avatar src={userDetails.profileImage} size="lg" id="image" rounded/>
          {:else}
          <Avatar src={userDetails.profileImage} size="lg" id="image" rounded/>
          {/if}
        </div>
        <Fileupload id="files" bind:file={fileUpload} size='sm' on:click={pictureUpdate} />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2 w-1/6">
      <div>
        <Label for="first_name" class="mb-2">Display Name</Label>
        <Input type="text" id="first_name" bind:value={userDetails.name} placeholder="John" required  />
      </div>
    </div>
    {#if userDetails.email}
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" bind:value={userDetails.email} placeholder="john.doe@company.com" required />
    </div>
    {/if}
    <Button type="submit" on:click={updateProfile}>Update Profile</Button>

    <!-- Admin Roles -->
    
    {#if $authStore.data.roles.includes('admin')}
    <div class="mb-6 mt-2 w-1/12">
      <Label for="store" class="mb-2">Add Company Role To User</Label>
      <Input type="text" id="companyRole" placeholder="+964" required />
    </div>
    <div class="mb-6 w-1/12">
      <Label for="company" class="mb-2">Add Store Role To User</Label>
      <Input type="text" id="storeRole" placeholder="+964" required />
    </div>
    <div class="mb-6 w-1/12">
      <Label for="admin" class="mb-2">Add Admin Role To User</Label>
      <Input type="text" id="adminRole" placeholder="+964" required />
    </div>
    {/if}
  </form>
