<template>
  <Layout>
    <form @submit.prevent="submit" class="flex">
      <input
        v-model="form.ref"
        type="text"
        placeholder="הכנס כתובת מקור"
        class="px-2 py-1 me-2 border outline-none border-gray-200 focus:border-gray-600"
      />
      <button type="submit" class="bg-gray-800 text-white px-4 py-1">
        <span v-if="!loading">חפש</span>
        <Loader v-else />
      </button>
    </form>

    <section v-if="kabbalahLinks.length" class="my-8">
      <!-- <nav class="flex">
        <button v-for="category in linkCategories" :key="category" class="">
          {{ category }}
        </button>
      </nav> -->
      <nav class="flex items-center">
        <p class="text-gray-500 me-4">{{ kabbalahLinks.length }} תוצאות</p>
        <button
          class="bg-gray-500 text-white px-3 flex items-center py-1"
          @click="copyAll"
        >
          <svg class="w-5 me-2" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                d="M8 10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"
              />
              <path
                d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
              />
            </g>
          </svg>
          <span>העתק הכל</span>
        </button>
      </nav>
      <ul id="results" class="space-y-8 mt-6">
        <LinkResult
          v-for="(link, i) in kabbalahLinks"
          :key="link._id"
          :index="i + 1"
          :link="link"
          @delete="links = links.filter((l) => l._id !== link._id)"
        />
      </ul>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import Layout from "./components/Layout.vue";
import Loader from "./components/Loader.vue";
import LinkResult from "./components/LinkResult.vue";

const form = reactive({
  ref: "במדבר א:א",
});

const loading = ref(false);
const links = ref<Link[]>([]);
const kabbalahLinks = computed(() => {
  return links.value.filter((link) => link.category === "Kabbalah");
});
// const linkCategories = computed(() => {
//   return links.value
//     .map((link) => link.category)
//     .filter((value, index, self) => self.indexOf(value) === index);
// });

const submit = () => {
  links.value = [];
  loading.value = true;
  const options = { method: "GET", headers: { accept: "application/json" } };

  fetch(
    `https://www.sefaria.org/api/links/${form.ref}?with_text=1&with_sheet_links=0`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      links.value = response;
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      console.error(err);
    });
};

const copyAll = () => {
  const container = document.getElementById("results")!;
  // get all text from all children
  const text = Array.from(container.children)
    .map((child) => child.innerText)
    .join("\n\n\r ");
  navigator.clipboard.writeText(text);
  console.log(text);
};
</script>
