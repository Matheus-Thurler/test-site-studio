<script setup lang="ts">
// Supondo que 'Collections' seja um tipo que você definiu.
// Se não for essencial para este debug, pode ser comentado.
// import type { Collections } from '@nuxt/content';

const { locale } = useI18n();
const localePath = useLocalePath();

console.log(`[INÍCIO SCRIPT] Locale atual no setup: ${locale.value}`);

const { data: projects, error: projectsError } = await useAsyncData(
  'projects-debug-' + locale.value, // Chave dinâmica para o cache do useAsyncData
  async () => {
    const currentLocale = locale.value;
    // Construindo o nome da coleção como no seu código original
    const collectionName = ('projects_' + currentLocale);

    console.log(`[useAsyncData] Iniciando busca para locale: '${currentLocale}'`);
    console.log(`[useAsyncData] Nome da coleção alvo: '${collectionName}'`);
    console.log(`[useAsyncData] Tentando executar: queryCollection('${collectionName}').all()`);

    let items = null;
    try {
      // Usando a sua chamada original.
      // O 'as any' é para TypeScript, caso 'collectionName' não seja um tipo estrito em 'Collections'.
      items = await queryCollection(collectionName as any).all();

      if (items) {
        console.log(`[useAsyncData] Sucesso! queryCollection('${collectionName}').all() retornou ${items.length} itens.`);
        if (items.length > 0) {
          // Logando alguns detalhes dos primeiros itens para inspeção
          // Adapte os campos (p._path, p.name, p.title) conforme a estrutura real dos seus itens de projeto
          console.log('[useAsyncData] Amostra dos primeiros itens (path, name, title):',
            JSON.stringify(
              items.slice(0, 3).map((p: any) => ({ _path: p._path, name: p.name, title: p.title, featured: p.featured, release: p.release })),
              null,
              2
            )
          );
        }
      } else {
        // Isso aconteceria se .all() retornasse null ou undefined, o que é incomum.
        // Mais provável é um array vazio se nada for encontrado.
        console.warn(`[useAsyncData] queryCollection('${collectionName}').all() retornou null ou undefined.`);
      }
      return items; // Retorna os itens encontrados
    } catch (e: any) {
      console.error(`[useAsyncData] ERRO ao executar queryCollection('${collectionName}').all()`);
      console.error(`[useAsyncData] Mensagem do erro: ${e.message}`);
      if (e.stack) {
        console.error(`[useAsyncData] Stacktrace do erro: ${e.stack}`);
      }
      // Você pode decidir o que fazer em caso de erro:
      // throw e; // Para fazer o useAsyncData popular a variável 'projectsError' e possivelmente mostrar um erro na página.
      return [];  // Ou retornar um array vazio para que a lista de projetos fique vazia na página.
    }
  },
  {
    watch: [locale], // Mantém o watch para re-executar quando o locale mudar
  }
);

// Log para o erro capturado pelo useAsyncData (se houver)
if (projectsError.value) {
  console.error(`[ERRO useAsyncData] Erro capturado para o locale '${locale.value}':`, projectsError.value);
}

// Log para os dados finais que o template receberá
// console.log(`[FIM SCRIPT] Dados de 'projects' para o template (locale: ${locale.value}):`, JSON.stringify(projects.value, null, 2));

</script>

<template>
  <div class="flex w-full flex-col gap-6 shadow-xl">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      {{ $t("navigation.works") }}
    </h3>
    <div class="flex w-full flex-col gap-4">
      <NuxtLink
        v-for="project in projects?.filter((work) => work.featured)"
        :key="project.name"
        role="link"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-900"
        :to="project.release === 'soon' ? localePath('/') : project.link"
        :aria-label="'go to ' + project.name + ' project website'"
        :target="project.release === 'soon' ? '_self' : '_blank'"
      >
        <span class="whitespace-nowrap font-medium">
          {{ project.name }}
        </span>
        <div class="mx-2 h-[0.1px] w-full bg-muted" />
        <span class="whitespace-nowrap">
          {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
        </span>
      </NuxtLink>
    </div>
    <NuxtLinkLocale to="/works">
      <span class="font-newsreader italic text-white-shadow cursor-pointer">
        {{ $t("global.see_more") }}
      </span>
    </NuxtLinkLocale>
  </div>
</template>
