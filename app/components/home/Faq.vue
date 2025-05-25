<!--<script setup lang="ts">-->
<!--import { withLeadingSlash } from 'ufo'-->
<!--import type { Collections } from '@nuxt/content'-->

<!--const route = useRoute()-->
<!--const { locale } = useI18n()-->

<!--const slug = computed(() => withLeadingSlash(String(route.params.slug)))-->
<!--const { data: faq } = await useAsyncData('faq-' + slug.value, async () => {-->
<!--  const collection = ('faq_' + locale.value) as keyof Collections-->
<!--  return await queryCollection(collection).first() as Collections['faq_en'] | Collections['faq_ptbr']-->
<!--}, {-->
<!--  watch: [locale],-->
<!--})-->

<!--const items = computed(() => {-->
<!--  return faq.value?.faqQuestions.map((faq) => {-->
<!--    return {-->
<!--      label: faq.title,-->
<!--      key: faq.title.toLowerCase(),-->
<!--      questions: faq.questions,-->
<!--    }-->
<!--  })-->
<!--})-->

<!--const ui = {-->
<!--  root: 'flex items-center gap-4 w-full',-->
<!--  list: 'relative flex bg-transparent dark:bg-transparent gap-2',-->
<!--  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-full bg-white/10 dark:bg-neutral-900',-->
<!--  trigger: [-->
<!--    'relative inline-flex items-center justify-center flex-shrink-0 focus:outline-none transition-colors duration-200 ease-out border-white/10 border-2',-->
<!--    'px-3 py-2 font-medium rounded-full',-->
<!--    'hover:bg-neutral-900/80',-->
<!--    'data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white',-->
<!--    'data-[state=inactive]:text-neutral-500 dark:data-[state=inactive]:text-neutral-400',-->
<!--  ],-->
<!--  label: 'truncate',-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="flex flex-col items-center justify-center space-y-8 w-full sm:px-20 md:px-30">-->
<!--    <div class="flex flex-col items-center justify-center gap-2">-->
<!--      <h3 class="font-newsreader italic text-white-shadow text-4xl">-->
<!--        {{ faq!.title }}-->
<!--      </h3>-->
<!--      <p class="text-center text-sm font-medium text-muted">-->
<!--        {{ faq!.subtitle }}-->
<!--      </p>-->
<!--    </div>-->
<!--    <UTabs-->
<!--      :items-->
<!--      orientation="horizontal"-->
<!--      :ui-->
<!--    >-->
<!--      <template #content="{ item }">-->
<!--        <UAccordion-->
<!--          trailing-icon="lucide:plus"-->
<!--          :items="item.questions"-->
<!--          :ui="{-->
<!--            item: 'mb-2 group px-4 transform-gpu rounded-xl border border-white/10 bg-white/5 transition duration-500 will-change-transform hover:bg-white/[0.075]',-->
<!--            trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135',-->
<!--          }"-->
<!--        />-->
<!--      </template>-->
<!--    </UTabs>-->
<!--  </div>-->
<!--</template>-->
<script setup lang="ts">
// Se 'Collections' é um tipo seu, mantenha.
// Se você tiver um tipo específico para o objeto FAQ, seria bom usá-lo.
import type { Collections } from '@nuxt/content';
// Exemplo de tipos (adapte à sua estrutura de dados real em faqQuestions):
// interface FAQQuestionItem { label: string; content: string; /* ...outros campos se houver */ }
// interface FAQCategory { title: string; /* Este 'title' será o 'label' da Tab */ questions: FAQQuestionItem[]; }
// interface FAQDocument { title: string; subtitle: string; faqQuestions: FAQCategory[]; _path?: string; /* ...outros campos do frontmatter */ }

const { locale } = useI18n();

// A chave do useAsyncData agora depende apenas do locale, pois não há slug.
// Estamos buscando um FAQ "geral" ou o "primeiro" para o idioma.
const asyncDataKey = computed(() => `static-faq-content-${locale.value}`);

const { data: faq, error } = await useAsyncData(
  asyncDataKey.value,
  async () => {
    const currentLocale = locale.value;
    // Nome da coleção como no seu padrão (ex: 'faq_ptbr')
    const collectionName = ('faq_' + currentLocale) as keyof Collections;

    console.log(`[STATIC FAQ] Locale: '${currentLocale}', Tentando buscar PRIMEIRO FAQ da Coleção: '${collectionName}'`);

    try {
      // Usando sua queryCollection().first() para pegar o primeiro item da coleção do idioma.
      // Assumimos que queryCollection('faq_ptbr').first() busca o primeiro doc em content/ptbr/faq/
      const firstFaqDocument = await queryCollection(collectionName).first() as any; // Use seu tipo FAQDocument aqui

      if (firstFaqDocument) {
        console.log(`[STATIC FAQ] Primeiro FAQ encontrado na coleção '${collectionName}':`, firstFaqDocument.title || firstFaqDocument._path);
        return firstFaqDocument; // Retorna o documento FAQ encontrado
      } else {
        console.warn(`[STATIC FAQ] Nenhum FAQ encontrado (ou .first() retornou null/vazio) na coleção '${collectionName}'. Verifique se a pasta 'content/${currentLocale}/faq/' contém arquivos e se a queryCollection está configurada para encontrá-los.`);
        return null;
      }
    } catch (e: any) {
      console.error(`[STATIC FAQ] Erro ao buscar o primeiro FAQ da coleção '${collectionName}':`, e.message);
      if (e.stack) console.error(`[STATIC FAQ] Stack: ${e.stack}`);
      return null; // Retorna null em caso de erro para o template lidar
    }
  },
  {
    watch: [locale], // Re-executa a busca se o idioma mudar
  }
);

if (error.value) {
  console.error("[STATIC FAQ] Erro final capturado pelo useAsyncData:", error.value);
}

// O 'items' para UTabs é derivado do 'faq.value.faqQuestions'
// É importante que o template lide com 'faq.value' podendo ser null
const items = computed(() => {
  if (!faq.value || !faq.value.faqQuestions) { // Adicionada verificação para faq.value
    return []; // Retorna array vazio se faq ou faqQuestions não existir
  }
  // O map assume que faq.value.faqQuestions é um array de "categorias" de FAQ
  return faq.value.faqQuestions.map((faqCategory: any) => { // Use seu tipo FAQCategory aqui
    return {
      label: faqCategory.title, // Título da categoria de FAQ (para a aba)
      key: faqCategory.title.toLowerCase().replace(/\s+/g, '-'), // Gera uma chave mais robusta
      questions: faqCategory.questions, // Array de perguntas para o UAccordion
    };
  });
});

// Sua configuração de UI para UTabs (mantida)
const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-full bg-white/10 dark:bg-neutral-900',
  trigger: [
    'relative inline-flex items-center justify-center flex-shrink-0 focus:outline-none transition-colors duration-200 ease-out border-white/10 border-2',
    'px-3 py-2 font-medium rounded-full',
    'hover:bg-neutral-900/80',
    'data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white',
    'data-[state=inactive]:text-neutral-500 dark:data-[state=inactive]:text-neutral-400',
  ],
  label: 'truncate',
};
</script>

<template>
  <div v-if="error" class="text-center text-red-500 p-10">
    Ocorreu um erro ao carregar o conteúdo do FAQ.
  </div>
  <div v-else-if="!faq && !error" class="text-center text-muted p-10">
    Carregando FAQ...
  </div>
  <div v-else-if="faq" class="flex flex-col items-center justify-center space-y-8 w-full sm:px-20 md:px-30">
    <div class="flex flex-col items-center justify-center gap-2">
      <h3 class="font-newsreader italic text-white-shadow text-4xl">
        {{ faq.title }}
      </h3>
      <p class="text-center text-sm font-medium text-muted">
        {{ faq.subtitle }}
      </p>
    </div>
    <UTabs
      v-if="items && items.length > 0"
      :items="items"
      orientation="horizontal"
      :ui="ui"
    >
      <template #content="{ item }">
        <UAccordion
          trailing-icon="lucide:plus"
          :items="item.questions"
          :ui="{
            item: 'mb-2 group px-4 transform-gpu rounded-xl border border-white/10 bg-white/5 transition duration-500 will-change-transform hover:bg-white/[0.075]',
            trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135',
          }"
        />
      </template>
    </UTabs>
    <div v-else class="text-center text-muted">
      Nenhuma pergunta frequente encontrada para este tópico.
    </div>
  </div>
  <div v-else class="text-center text-orange-400 p-10">
    Conteúdo do FAQ não encontrado.
  </div>
</template>
