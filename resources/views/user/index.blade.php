@include('includes.header')
@include('includes.layout_header')
<header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <ul role="list" class="divide-y divide-gray-100">
      @foreach ($users as $user)
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ strtoupper($user->last_name) }}, {{ strtoupper($user->first_name) }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500"> {{ strtolower($user->email) }} </p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{{ ucwords($user->position) }}</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">{{ ucwords($user->role) }}</p>
          </div>
        </li>
      @endforeach
      
    </ul>
    </div>
  </main>
</div>
@include('includes.footer')