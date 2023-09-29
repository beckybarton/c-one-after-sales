@include('includes.header')

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">USER REGISTRATION</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="{{ route('register.post') }}" method="POST">
    @csrf
      <div>
        <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
        <div class="mt-2">
          <input id="first_name" name="first_name" type="text" autocomplete="first_name" required class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
        <div class="mt-2">
          <input id="last_name" name="last_name" type="text" autocomplete="last_name" required class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <label for="mobile_number" class="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
        <div class="mt-2">
          <input id="mobile_number" name="mobile_number" type="text" autocomplete="mobile_number" required class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <label for="position" class="block text-sm font-medium leading-6 text-gray-900">Position</label>
        <div class="mt-2">
          <input id="position" name="position" type="text" autocomplete="position" required class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
          <div class="mt-2">
            <select id="role" name="role" autocomplete="role" class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">  
              <option value="admin">Admin</option>
              <option value="normal">Normal</option>
              <option value="approver">Approver</option>
            </select>
          </div>
        </div>

      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 px-4 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
    
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</div>

@include('includes.footer')
