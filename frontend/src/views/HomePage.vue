<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white p-6 space-y-6 z-50"
  >
    <svg
      class="w-20 h-20 animate-pulse text-yellow-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M12 2v2m0 14v2m10-10h-2M4 12H2m16.364-5.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636"
      />
    </svg>

    <h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg">
      Under Construction
    </h1>

    <p
      class="max-w-xl text-center text-lg font-semibold text-yellow-300 drop-shadow-md"
    >
      🚧 We’re building something amazing. Please check back soon!
    </p>

    <div class="mt-4">
      <button
        @click="$router.back()"
        class="px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition"
      >
        Go Back
      </button>
    </div>
  </div>
</template>
