<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { aquaticDiseases } from '../data/diseasesData'
import type { AquaticDisease } from '../types'


const router = useRouter()


const searchQuery = ref('')

const selectedCategory = ref<
  'All' | AquaticDisease['category']
>('All')


const categories = [
  'All',
  'Bacterial',
  'Viral',
  'Parasitic',
  'Fungal',
  'Environmental'
]



const filteredDiseases = computed(() => {

  return aquaticDiseases.filter((disease) => {


    const search =
      searchQuery.value.toLowerCase()


    const matchesSearch =
      disease.name
        .toLowerCase()
        .includes(search)
      ||
      disease.affectedSpecies.some(
        species =>
          species
            .toLowerCase()
            .includes(search)
      )


    const matchesCategory =
      selectedCategory.value === 'All'
      ||
      disease.category === selectedCategory.value


    return matchesSearch && matchesCategory

  })

})



function openDisease(id: number) {

  router.push({
    name: 'diseases-detail',
    params: {
      id
    }
  })

}




function severityStyle(
  severity: AquaticDisease['severity']
) {

  switch (severity) {

    case 'Low':
      return 'bg-green-100 text-green-700'


    case 'Medium':
      return 'bg-yellow-100 text-yellow-700'


    case 'High':
      return 'bg-orange-100 text-orange-700'


    case 'Critical':
      return 'bg-red-100 text-red-700'

  }

}



function categoryStyle(
  category: AquaticDisease['category']
) {


  switch(category) {

    case 'Bacterial':
      return 'bg-red-50 text-red-700'


    case 'Viral':
      return 'bg-purple-50 text-purple-700'


    case 'Parasitic':
      return 'bg-blue-50 text-blue-700'


    case 'Fungal':
      return 'bg-green-50 text-green-700'


    case 'Environmental':
      return 'bg-gray-100 text-gray-700'

  }

}

</script>



<template>

<div class="min-h-screen bg-green-50">


  <div
    class="mx-auto max-w-7xl px-5 py-10"
  >



    <!-- Header -->

    <section
      class="mb-10 text-center"
    >

      <div class="mb-4 text-6xl">
        🦠
      </div>


      <h1
        class="text-3xl font-bold text-green-900"
      >
        Aquatic Disease Guide
      </h1>


      <p
        class="mx-auto mt-3 max-w-xl text-gray-600"
      >
        Learn about common diseases,
        symptoms, causes, and prevention
        methods for farmed aquatic species.
      </p>


    </section>





    <!-- Search -->

    <div
      class="mb-6"
    >

      <div
        class="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
      >

        <span class="text-xl">
          🔍
        </span>


        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search disease or fish species..."
          class="w-full bg-transparent text-lg outline-none"
        />


      </div>

    </div>






    <!-- Categories -->

    <div
      class="mb-8 flex gap-3 overflow-x-auto pb-2"
    >

      <button
        v-for="category in categories"
        :key="category"
        @click="
          selectedCategory = category as any
        "
        class="whitespace-nowrap rounded-full px-5 py-3 font-medium transition"
        :class="
          selectedCategory === category
          ?
          'bg-green-700 text-white'
          :
          'bg-white text-gray-700 hover:bg-green-100'
        "
      >

        {{ category }}

      </button>


    </div>







    <!-- Count -->

    <p
      class="mb-5 text-gray-600"
    >

      Showing

      <strong>
        {{ filteredDiseases.length }}
      </strong>

      diseases

    </p>








    <!-- Disease Cards -->


    <div
      v-if="filteredDiseases.length"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >


      <article

        v-for="disease in filteredDiseases"

        :key="disease.id"

        @click="
          openDisease(disease.id)
        "

        class="
          cursor-pointer
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-sm
          transition
          hover:-translate-y-1
          hover:shadow-xl
        "

      >



        <!-- Image -->


        <div
          class="
            flex
            h-48
            items-center
            justify-center
            bg-green-100
          "
        >

          <img
            v-if="disease.imageUrl"
            :src="disease.imageUrl"
            :alt="disease.name"
            class="
              h-full
              w-full
              object-cover
            "
          />


          <span
            v-else
            class="text-6xl"
          >
            🦠
          </span>


        </div>







        <div
          class="p-6"
        >


          <h2
            class="
              text-xl
              font-bold
              text-gray-900
            "
          >

            {{ disease.name }}

          </h2>



          <p
            v-if="disease.scientificName"
            class="
              mt-1
              italic
              text-gray-500
            "
          >

            {{ disease.scientificName }}

          </p>






          <!-- Badges -->


          <div
            class="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >


            <span
              class="
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
              "
              :class="
                categoryStyle(
                  disease.category
                )
              "
            >

              {{ disease.category }}

            </span>




            <span
              class="
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
              "
              :class="
                severityStyle(
                  disease.severity
                )
              "
            >

              {{ disease.severity }}

            </span>


          </div>







          <!-- Affected Species -->


          <div
            class="mt-5"
          >

            <p
              class="
                text-sm
                text-gray-500
              "
            >

              Affects

            </p>


            <p
              class="
                mt-1
                font-medium
                text-gray-700
              "
            >

              {{ disease.affectedSpecies.join(', ') }}

            </p>


          </div>







          <!-- Symptoms -->


          <div
            class="mt-5"
          >

            <p
              class="
                text-sm
                text-gray-500
              "
            >

              Common Symptoms

            </p>


            <ul
              class="
                mt-2
                space-y-1
                text-gray-700
              "
            >

              <li
                v-for="symptom in disease.symptoms.slice(0,3)"
                :key="symptom"
                class="
                  flex
                  gap-2
                "
              >

                <span>
                  •
                </span>

                {{ symptom }}

              </li>


            </ul>


          </div>







          <!-- Footer -->


          <div
            class="
              mt-6
              border-t
              pt-4
              text-green-700
              font-semibold
            "
          >

            Learn Prevention →

          </div>


        </div>


      </article>


    </div>







    <!-- Empty -->


    <div
      v-else
      class="
        rounded-3xl
        bg-white
        p-10
        text-center
        shadow
      "
    >

      <div class="text-5xl">
        🔎
      </div>


      <h2
        class="
          mt-4
          text-xl
          font-bold
        "
      >

        No disease found

      </h2>


      <p
        class="
          mt-2
          text-gray-600
        "
      >

        Try searching another disease
        or category.

      </p>


    </div>



  </div>


</div>


</template>
