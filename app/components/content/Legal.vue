<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader text-white-shadow text-center text-2xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <Divider class="mb-8 mt-2" />

    <h2 class="text-center text-lg font-extralight text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <h1 class="font-newsreader text-white-shadow text-center text-2xl">
      <slot
        name="title2"
        mdc-unwrap="p"
      />
    </h1>

    <h2 class="text-center text-lg font-extralight text-muted">
      <slot
        name="subtitle2"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <h1 class="font-newsreader text-white-shadow text-center text-2xl">
      <slot
        name="title3"
        mdc-unwrap="p"
      />
    </h1>

    <h2 class="text-center text-lg font-extralight text-muted">
      <slot
        name="subtitle3"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />
    <h1 class="font-newsreader text-white-shadow text-center text-2xl">
      <slot
        name="title4"
        mdc-unwrap="p"
      />
    </h1>

    <h2 class="text-center text-lg font-extralight text-muted">
      <slot
        name="subtitle4"
        mdc-unwrap="p"
      />
    </h2>
  </section>
</template>
