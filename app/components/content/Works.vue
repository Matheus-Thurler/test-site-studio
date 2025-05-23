<!--<script setup lang="ts">-->
<!--import type { Collections } from '@nuxt/content'-->

<!--const { locale } = useI18n()-->

<!--const { data: projects } = await useAsyncData('projects', async () => {-->
<!--  const collection = ('projects_' + locale.value) as keyof Collections-->
<!--  return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_ptbr'][]-->
<!--}, {-->
<!--  watch: [locale],-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">-->
<!--    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">-->
<!--      <slot-->
<!--        name="title"-->
<!--        mdc-unwrap="p"-->
<!--      />-->
<!--    </h1>-->
<!--    <h2 class="text-center text-lg font-extralight italic text-muted">-->
<!--      <slot-->
<!--        name="subtitle"-->
<!--        mdc-unwrap="p"-->
<!--      />-->
<!--    </h2>-->
<!--    <Divider class="mb-8 mt-2" />-->
<!--    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">-->
<!--      <ProjectCard-->
<!--        v-for="project in projects"-->
<!--        :key="project.name"-->
<!--        :project-->
<!--      />-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->
<script setup lang="ts">
// Se você tem um tipo para Collections, mantenha.
// Se 'Collections' é um tipo genérico e você tem um tipo mais específico para
// os itens de projeto, pode ser melhor usá-lo na asserção de tipo.
import type { Collections } from '@nuxt/content';
// Exemplo: import type { MyProjectType } from '~/types';

const { locale } = useI18n();
// const localePath = useLocalePath(); // Não parece ser usado neste script, mas pode manter se usar no template abaixo que não foi mostrado

console.log(`[WORKS PAGE SCRIPT] Locale atual no setup: ${locale.value}`);

// 1. Chave do useAsyncData alterada para ser ÚNICA POR IDIOMA:
const { data: projects, error: projectsError } = await useAsyncData(
  'works-page-projects-' + locale.value, // Chave mais específica: 'works-page-projects-ptbr', 'works-page-projects-en'
  async () => {
    const currentLocale = locale.value;
    // 2. Lógica original para nome da coleção mantida, pois os logs do dev mostraram que funciona:
    const collectionName = ('projects_' + currentLocale) as keyof Collections;

    console.log(`[WORKS PAGE useAsyncData] Iniciando busca para locale: '${currentLocale}'`);
    console.log(`[WORKS PAGE useAsyncData] Nome da coleção alvo: '${collectionName}'`);
    console.log(`[WORKS PAGE useAsyncData] Tentando executar: queryCollection('${collectionName}').all()`);

    let items = null;
    try {
      // Usando a sua chamada original que funcionou nos logs do dev
      items = await queryCollection(collectionName).all() as Collections['projects_en'][] | Collections['projects_ptbr'][]; // Mantenha sua tipagem aqui

      if (items) {
        console.log(`[WORKS PAGE useAsyncData] Sucesso! queryCollection('${collectionName}').all() retornou ${items.length} itens.`);
        if (items.length > 0) {
          console.log('[WORKS PAGE useAsyncData] Amostra dos primeiros itens (path, name, title, featured, release):',
            JSON.stringify(
              // Ajuste os campos conforme a estrutura real dos seus itens de projeto
              items.slice(0, 3).map((p: any) => ({ _path: p._path, name: p.name, title: p.title, featured: p.featured, release: p.release })),
              null,
              2
            )
          );
        }
      } else {
        console.warn(`[WORKS PAGE useAsyncData] queryCollection('${collectionName}').all() retornou null ou undefined.`);
      }
      return items;
    } catch (e: any) {
      console.error(`[WORKS PAGE useAsyncData] ERRO ao executar queryCollection('${collectionName}').all()`);
      console.error(`[WORKS PAGE useAsyncData] Mensagem do erro: ${e.message}`);
      if (e.stack) {
        console.error(`[WORKS PAGE useAsyncData] Stacktrace do erro: ${e.stack}`);
      }
      return []; // Retorna array vazio em caso de erro
    }
  },
  {
    watch: [locale],
  }
);

if (projectsError.value) {
  console.error(`[WORKS PAGE ERRO useAsyncData] Erro capturado para o locale '${locale.value}':`, projectsError.value);
}
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in projects"
        :key="project?.name" :project="project"
      />
    </div>
  </section>
</template>
