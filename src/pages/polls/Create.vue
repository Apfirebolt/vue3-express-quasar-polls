<template>
  <app-page>
    <p class="text-center text-h5 text-blue-5">Create Poll</p>
    <q-form @submit="onSubmit" class="q-gutter-md q-pa-md" id="register-form">
      <q-input
        outlined
        hide-bottom-space
        :error="!!errors['title']"
        :error-message="errors['title']"
        id="title"
        name="title"
        label="Poll Title"
        :errors="errors"
        v-model="title"
      ></q-input>
      <q-input
        outlined
        hide-bottom-space
        :error="!!errors['description']"
        :error-message="errors['description']"
        id="description"
        name="description"
        label="Enter Poll Description"
        :errors="errors"
        v-model="description"
      ></q-input>
      <q-btn
        label="Submit"
        color="primary"
        type="submit"
        :loading="isSubmitting"
      />
      <q-btn
        label="Add Choices"
        color="secondary"
        type="button"
        @click.prevent="isChoiceModalOpened = !isChoiceModalOpened"
      />
    </q-form>
    <div class="q-pa-md" v-if="choices.length">
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="(choice, index) in choices"
          :key="index"
          class="flex justify-between items-center"
        >
          <q-item-section>
            <q-item-label>{{ choice.name }}</q-item-label>
          </q-item-section>
          <q-btn
            label="Remove Choice"
            color="red"
            type="button"
            @click.prevent="removeChoice(choice.name)"
          />
        </q-item>
      </q-list>
    </div>
    <p class="text-h5 text-red text-center q-my-md" v-else>No choices added</p>
    <q-dialog v-model="isChoiceModalOpened">
      <add-choice-modal @addChoice="addChoice" />
    </q-dialog>
  </app-page>
</template>

<script lang="ts">
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import AddChoiceModal from '../../components/AddChoiceModal.vue';
import {
  Choice,
  CreatePollPayload,
  PollCreatePayloadSchema,
} from '../../composables/polls/model';
import { defineComponent, watchEffect, ref } from 'vue';
import usePolls from '../../composables/polls/index';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import AppPage from 'src/hoc/AppPage.vue';

export default defineComponent({
  name: 'CreatePollPage',
  components: {
    AddChoiceModal,
    AppPage,
  },
  setup() {
    const router = useRouter();
    const { success, create } = usePolls();
    const isChoiceModalOpened = ref<boolean>(false);
    const choices = ref<Choice[]>([]);
    const validationSchema = toFormValidator(PollCreatePayloadSchema);
    const { handleSubmit, isSubmitting, errors } = useForm<CreatePollPayload>({
      validationSchema,
    });
    const { value: title } = useField('title');
    const { value: description } = useField('description');

    const onSubmit = handleSubmit(async (values) => {
      if (choices.value.length < 3) {
        Notify.create({
          type: 'warning',
          position: 'top',
          message: 'Please add at least 3 choices to your poll',
        });
      } else {
        const payload = {
          title: values.title,
          description: values.description,
          choices: choices.value,
        };
        await create(payload);
      }
    });

    watchEffect(() => {
      if (success.value) {
        Notify.create({
          type: 'positive',
          position: 'top',
          message: 'Poll Created successfully',
        });
        router.push({ name: 'Polls' });
      }
    });

    const addChoice = (choice: Choice) => {
      choices.value.push(choice);
      isChoiceModalOpened.value = false;
    };

    const removeChoice = (choiceName: string) => {
      choices.value = choices.value.filter((item) => item.name !== choiceName);
    };

    return {
      isSubmitting,
      errors,
      onSubmit,
      title,
      description,
      success,
      isChoiceModalOpened,
      choices,
      addChoice,
      removeChoice,
    };
  },
});
</script>
