<template>
      <b-modal id="modal-1234567"  centered size="md" cancel-disabled>
            <div class="modal-table">
123
            </div>
            <template #modal-footer="{ ok, cancel }">

                <b-button size="md" variant="danger"  @click="cancel()">Закрыть</b-button>

            </template>
        </b-modal>
</template>