<template  >  <div class="row user-list p-3">
  <div class="col col-8" >
    <DataTable
      :value="admins"
      :paginator="true"
      :rows="10"
      v-model:filters="filters"
      :loading="loading"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <template #header>
        <div
          class="flex justify-content-center align-items-center"
          style="justify-content: space-between !important"
        >
          <h5 class="m-0">Admin List</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <template #empty> No Admins found. </template>
      <template #loading> Loading Admins data. Please wait. </template>
      <Column sortable field="username" header="Name"></Column>
      <Column sortable field="email" header="Email"></Column>
      <Column sortable field="id" header="Id"></Column>
      <Column sortable field="password" header="Password"></Column>
      <Column
        headerStyle="width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
        header="Detail"
      >
        <template #body="{ data }">
            <router-link :to="'/detail/' + [data.id]"><Button type="button" icon="pi pi-cog"></Button></router-link>
        </template>
      </Column>
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
      </template>
    </DataTable>
  </div>


  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CustomerService from "./../userService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  name: "AdminList",
  created() {
    if (!localStorage.getItem("user")) {
        this.$router.push('/login')
    }
  },
  setup() {
    onMounted(() => {
      customerService.value
        .getAdminList()
        .then((data) => {
          admins.value = data;
          loading.value = false;
        });
    });

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const loading = ref(true);
    const admins = ref();
    const customerService = ref(new CustomerService());

    return {
      admins, 
      filters,
      loading
    };
  },
};
</script>

<style lang="scss">
img {
    vertical-align: middle;
}
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
.user-list {
  display: flex;
  justify-content: center;
}
</style>