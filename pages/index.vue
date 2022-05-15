<script setup lang="ts">
type TypeProject = {
  id: number;
  name: string;
  uid: string;
  logo_url: string;
  position: number;
  is_active: number;
  is_owner_watcher: boolean;
  dta_user_since: null;
  users: [];
  spent_sec_all_time: number;
};

type TypeData = {
  projects: TypeProject[];
};

definePageMeta({
  middleware: 'notauth',
  layout: 'main',
});

const config = useRuntimeConfig();

const showModal = ref(false);
const projectName = ref('');
const projectId = ref<number>(null);
const error = ref('');

const { data, refresh } = await useFetch<TypeData>(
  'projects-manage/index?sort=dta_create',
  {
    baseURL: config.API_BASE_URL,
    headers: { Authorization: `Bearer ${useCookie('token').value}` },
  }
);

const openEditProjectModal = (
  id: TypeProject['id'],
  name: TypeProject['name']
) => {
  showModal.value = !showModal.value;
  projectId.value = id;
  projectName.value = name;
};

const setError = (errMessage) => {
  error.value = errMessage;

  setTimeout(() => {
    error.value = '';
  }, 5000);
};

const saveProjectName = async () => {
  const { name } = data.value.projects.find(
    (project) => projectId.value === project.id
  );

  if (name === projectName.value) {
    setError("You didn't make any changes!");

    return;
  }

  const response = await fetch(
    `${config.API_BASE_URL}projects-manage/update?id=${projectId.value}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify({ name: projectName.value }),
    }
  );

  response
    .json()
    .then((res) => {
      console.log(res);

      if (res.status === 401) {
        setError(`You're ${res.name}! ${res.message}.`);

        return;
      }

      refresh();

      showModal.value = false;
      projectId.value = null;
      projectName.value = '';
    })
    .catch((err) => {
      setError(err.message);
    });
};
</script>

<template>
  <div>
    <VModalDialog v-model:show="showModal">
      <VForm width="auto" :border="false">
        <template #form-header>
          <VImage
            width="60px"
            src="https://api.quwi.com/images/logo_150.png"
            alt="Project 1"
          />
          <h2>Edit Project</h2>
        </template>
        <p v-if="error" class="error">{{ error }}</p>
        <VInput type="text" placeholder="project title" v-model="projectName" />
        <VButton @click="saveProjectName">Save</VButton>
      </VForm>
    </VModalDialog>
    <article v-for="project in data.projects" :key="project.id">
      <div class="project-title">
        <VImage
          width="60px"
          :src="
            project.logo_url
              ? project.logo_url
              : 'https://api.quwi.com/images/logo_150.png'
          "
          :alt="project.name"
        />
        <h3 @click="() => openEditProjectModal(project.id, project.name)">
          {{ project.name }}
        </h3>
      </div>
      <span class="status" :class="[project.is_active ? 'active' : 'inactive']">
        {{ project.is_active ? 'Active' : 'Inactive' }}
      </span>
      <ul>
        <li>
          time this week
          <span class="time">00:00:00</span>
        </li>
        <li>
          this month
          <span class="time">00:00:00</span>
        </li>
        <li>
          total
          <span class="time">00:00:00</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<style scoped>
h2 {
  margin-left: 30px;
  text-transform: uppercase;
}

.error {
  padding: 20px;
  font-size: 14px;
  color: #fff;
  background-color: #dc2c00;
  border-radius: 5px;
}

article {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 30px;
  transition: all 0.15s ease-in-out;
}

article:hover {
  background-color: #ddd;
}

article:last-child {
  margin-bottom: 0;
}

.project-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
}

.project-title h3 {
  margin-left: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.project-title h3:hover {
  color: #2975dc;
}

.status {
  font-weight: 600;
}

.status.active {
  color: #00dc82;
}

.status.inactive {
  color: #dc2c00;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

li .time {
  font-weight: 600;
  margin-left: 30px;
}
</style>
