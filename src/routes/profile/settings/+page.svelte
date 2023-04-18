<script lang="ts">

	import { Avatar, Button, Fileupload, Input, Label } from "flowbite-svelte";
	import { imageHandlers, profileHandlers } from "../../../store";
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
            <Avatar src={userDetails.profileImage} size="lg" id="image" rounded/>
        </div>
        <Fileupload id="files" bind:file={fileUpload} size='sm' on:click={pictureUpdate} />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <Label for="first_name" class="mb-2">Display Name</Label>
        <Input type="text" id="first_name" bind:value={userDetails.name} placeholder="John" required  />
      </div>
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" bind:value={userDetails.email} placeholder="john.doe@company.com" required />
    </div>
    <Button type="submit" on:click={updateProfile}>Submit</Button>
  </form>