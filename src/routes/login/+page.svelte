<div>
  {#if generalError}
    <div role="alert" class="alert alert-warning my-4 w-1/2 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>{generalError}</span>
      </div>
    {/if}
  
  <div class="m-auto w-[30%] border shadow-md px-12 py-14 my-12">
    <h1 class="text-2xl text-center">Login</h1>
  
    <form on:submit={handleLogin} class="flex flex-col gap-4 my-4">
      <div class="flex flex-col gap-2">
        <input bind:value={email} type="text" placeholder="Email" class="input input-bordered w-full" />
        {#if emailError} <span class="text-red-400">{emailError}</span> {/if}
      </div>
    
      <div class="flex flex-col gap-2">
        <input bind:value={password} type="password" placeholder="Password" class="input input-bordered w-full" />
        {#if passwordError} <span class="text-red-400">{passwordError}</span> {/if}
      </div>

      <button type="submit" class="btn btn-primary my-6"><span class="text-white">Login</span></button>
      <a class="link link-primary">Don't Have an acount?, Sign Up here</a>
    </form>
  </div>
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "$lib/authStore";
  import { login } from "$lib/firebase";
  import { goto } from "$app/navigation";

  let email = ''
  let password = ''
  let emailError = ''
  let passwordError = ''
  let generalError = ''

  $: emailError = validateEmail(email);
  $: passwordError = validatePassword(password);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  }

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password cannot be empty';
    }
    return '';
  }

  onMount(() => {
    $: if ($user) {
      window.location.href = '/';
    }
  });

  const handleLogin = async () => {
    if (!navigator.onLine) {
      generalError = 'You are currently offline. Please check your internet connection and try again.';
      return;
    }

    if (!emailError && !passwordError) {
      const res = await login(email, password)
      if (typeof res === 'string') {
        generalError = res
      } else {
        //  handle suucessful login
        goto('/')
      }
    } 
  }

</script>