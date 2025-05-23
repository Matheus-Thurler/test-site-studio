<!--<script setup lang="ts">-->
<!--import type { Collections } from '@nuxt/content'-->

<!--const { locale } = useI18n()-->
<!--const localePath = useLocalePath()-->

<!--const { data: projects } = await useAsyncData('projects', async () => {-->
<!--  const collection = ('projects_' + locale.value) as keyof Collections-->
<!--  return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_ptbr'][]-->
<!--}, {-->
<!--  watch: [locale],-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div class="flex w-full flex-col gap-6 shadow-xl">-->
<!--    <h3 class="font-newsreader italic text-white-shadow text-xl">-->
<!--      {{ $t("navigation.works") }}-->
<!--    </h3>-->
<!--    <div class="flex w-full flex-col gap-4">-->
<!--      <NuxtLink-->
<!--        v-for="project in projects?.filter((work) => work.featured)"-->
<!--        :key="project.name"-->
<!--        role="link"-->
<!--        class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-900"-->
<!--        :to="project.release === 'soon' ? localePath('/') : project.link"-->
<!--        :aria-label="'go to ' + project.name + ' project website'"-->
<!--        :target="project.release === 'soon' ? '_self' : '_blank'"-->
<!--      >-->
<!--        <span class="whitespace-nowrap font-medium">-->
<!--          {{ project.name }}-->
<!--        </span>-->
<!--        <div class="mx-2 h-[0.1px] w-full bg-muted" />-->
<!--        <span class="whitespace-nowrap">-->
<!--          {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}-->
<!--        </span>-->
<!--      </NuxtLink>-->
<!--    </div>-->
<!--    <NuxtLinkLocale to="/works">-->
<!--      <span class="font-newsreader italic text-white-shadow cursor-pointer">-->
<!--        {{ $t("global.see_more") }}-->
<!--      </span>-->
<!--    </NuxtLinkLocale>-->
<!--  </div>-->
<!--</template>-->
<script setup lang="ts">
// Se você tem um tipo específico para os seus objetos de projeto, pode importá-lo.
// Exemplo: import type { Project } from '~/types/project';

const { locale } = useI18n()
const localePath = useLocalePath()

// A chave do useAsyncData foi alterada para incluir o locale,
// isso ajuda a evitar conflitos de cache entre idiomas e garante
// que os dados sejam re-buscados ou servidos corretamente para cada idioma.
const { data: projects, error } = await useAsyncData('projects-list-' + locale.value, async () => {
  // Constrói o caminho para a subpasta de projetos baseada no locale atual
  // Ex: resultará em 'en/projects' ou 'ptbr/projects'
  const projectsPath = `${locale.value}/projects`;

  // console.log(`[DEBUG] Tentando buscar projetos de: content/${projectsPath}`); // Descomente para debug no servidor

  try {
    // Usando queryContent() do Nuxt Content (padrão para Nuxt 3)
    // Isso buscará todos os arquivos dentro de content/en/projects/ ou content/ptbr/projects/
    const projectItems = await queryContent(projectsPath)
                              // Adicione este filtro se seus dados de projeto são APENAS arquivos .json
                              // e você quer excluir outros tipos de arquivo (como .md) da lista.
                              .where({ _extension: 'json' })
                              .find(); // .find() busca todos os documentos que correspondem à query

    // Verificação para debug (aparecerá no log do servidor durante o generate ou dev)
    if (!projectItems || projectItems.length === 0) {
      // console.warn(`[DEBUG] Nenhum item de projeto encontrado em content/${projectsPath} usando o filtro .where({ _extension: 'json' }). Verifique a pasta, o conteúdo e o filtro.`);
    } else {
      // console.log(`[DEBUG] ${projectItems.length} projetos encontrados em content/${projectsPath}`);
    }

    // Se você tem um tipo 'Project', pode fazer a asserção:
    // return projectItems as Project[];
    return projectItems;

  } catch (e) {
    // console.error(`[DEBUG] Erro ao buscar projetos de content/${projectsPath}:`, e);
    return []; // Retorna um array vazio em caso de erro para não quebrar a renderização da página
  }
}, {
  watch: [locale], // Mantém o watch para re-buscar os dados quando o idioma mudar
});

// Opcional: Logar o erro no console do navegador do cliente, se houver um erro na busca de dados
if (process.client && error.value) {
  console.error('Erro ao carregar a lista de projetos:', error.value);
}
</script>

<template>
  <div class="flex w-full flex-col gap-6 shadow-xl">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      {{ $t("navigation.works") }}
    </h3>
    <div class="flex w-full flex-col gap-4">
      <NuxtLink
        v-for="project in projects?.filter((work) => work.featured)"
        :key="project.name" role="link"
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
