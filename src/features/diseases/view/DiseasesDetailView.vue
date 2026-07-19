<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { aquaticDiseases } from '../data/diseasesData';
import type { AquaticDisease } from '../types'


const props = defineProps<{
  id: string
}>()


const router = useRouter()



const disease = computed<AquaticDisease | undefined>(() => {

  return aquaticDiseases.find(
    item => item.id === Number(props.id)
  )

})



function goBack() {
  router.back()
}




function severityStyle(
  severity: AquaticDisease['severity']
) {

  switch(severity) {

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

<div
  v-if="disease"
  class="min-h-screen bg-green-50"
>


<div
  class="
    mx-auto
    max-w-5xl
    px-5
    py-8
  "
>



<!-- Back -->


<button
  @click="goBack"
  class="
    mb-6
    font-medium
    text-green-700
  "
>

  ← Back to Diseases

</button>







<!-- Header -->

<section
  class="
    overflow-hidden
    rounded-3xl
    bg-white
    shadow
  "
>



<div
  class="
    flex
    h-72
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
  class="text-8xl"
>
🦠
</span>


</div>






<div
  class="p-7"
>


<h1
  class="
    text-3xl
    font-bold
    text-green-900
  "
>

{{ disease.name }}

</h1>



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





<div
  class="
    mt-5
    flex
    flex-wrap
    gap-3
  "
>



<span
  class="
    rounded-full
    px-4
    py-2
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
    px-4
    py-2
    font-medium
  "
  :class="
    severityStyle(
      disease.severity
    )
  "
>

{{ disease.severity }} Risk

</span>



</div>


</div>


</section>









<!-- Description -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
    text-green-900
  "
>

About this Disease

</h2>



<p
  class="
    mt-4
    leading-relaxed
    text-gray-700
  "
>

{{ disease.description }}

</p>


</section>









<!-- Affected Species -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
    text-green-900
  "
>

Affected Species

</h2>



<div
  class="
    mt-4
    flex
    flex-wrap
    gap-3
  "
>


<span
  v-for="species in disease.affectedSpecies"
  :key="species"
  class="
    rounded-full
    bg-green-100
    px-4
    py-2
    text-green-700
  "
>

{{ species }}

</span>


</div>


</section>









<!-- Symptoms -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
    text-green-900
  "
>

⚠️ Signs and Symptoms

</h2>




<div
  class="
    mt-5
    space-y-3
  "
>


<div

  v-for="symptom in disease.symptoms"

  :key="symptom"

  class="
    flex
    items-center
    gap-3
    rounded-xl
    bg-red-50
    p-4
  "

>

<span>
❗
</span>


<p
 class="text-gray-700"
>
{{ symptom }}
</p>


</div>


</div>


</section>









<!-- Causes -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
    text-green-900
  "
>

Possible Causes

</h2>




<ul
  class="
    mt-5
    space-y-3
  "
>


<li
  v-for="cause in disease.causes"
  :key="cause"
  class="
    flex
    gap-3
    text-gray-700
  "
>

<span>
🔹
</span>

{{ cause }}

</li>


</ul>


</section>









<!-- Prevention -->


<section
  class="
    mt-6
    rounded-3xl
    bg-green-700
    p-7
    text-white
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
  "
>

🛡 Prevention

</h2>




<ul
  class="
    mt-5
    space-y-3
  "
>


<li
  v-for="item in disease.prevention"
  :key="item"
  class="
    flex
    gap-3
  "
>


<span>
✓
</span>


{{ item }}


</li>


</ul>


</section>









<!-- Treatment -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
  class="
    text-2xl
    font-bold
    text-green-900
  "
>

Treatment / Management

</h2>



<div
  class="
    mt-5
    space-y-3
  "
>


<div
  v-for="item in disease.treatment"
  :key="item"
  class="
    rounded-xl
    bg-yellow-50
    p-4
    text-gray-700
  "
>


{{ item }}


</div>


</div>


</section>









<!-- Environment -->


<section
  class="
    mt-6
    grid
    gap-4
    sm:grid-cols-2
  "
>



<div
  class="
    rounded-2xl
    bg-white
    p-5
    shadow
  "
>


<p class="text-sm text-gray-500">
Water Type
</p>


<p class="mt-2 font-bold">
{{ disease.affectedWaterType }}
</p>


</div>





<div
  class="
    rounded-2xl
    bg-white
    p-5
    shadow
  "
>


<p class="text-sm text-gray-500">
Common Locations
</p>


<p class="mt-2 font-bold">
{{ disease.commonIn.join(', ') }}
</p>


</div>



</section>









<!-- Tags -->


<section
  class="
    mt-6
    rounded-3xl
    bg-white
    p-7
    shadow
  "
>


<h2
 class="
 text-2xl
 font-bold
 text-green-900
 "
>

Keywords

</h2>



<div
 class="
 mt-4
 flex
 flex-wrap
 gap-3
 "
>


<span
 v-for="tag in disease.tags"
 :key="tag"
 class="
 rounded-full
 bg-green-100
 px-4
 py-2
 text-green-700
 "
>

{{ tag }}

</span>


</div>


</section>






</div>


</div>






<!-- Not Found -->

<div
v-else
class="
min-h-screen
flex
items-center
justify-center
bg-green-50
"
>


<div
class="
rounded-3xl
bg-white
p-10
text-center
shadow
"
>


<div class="text-5xl">
🦠
</div>


<h2
class="
mt-4
text-xl
font-bold
"
>

Disease Not Found

</h2>



<button
@click="goBack"
class="
mt-5
rounded-xl
bg-green-700
px-6
py-3
text-white
"
>

Go Back

</button>


</div>


</div>


</template>
