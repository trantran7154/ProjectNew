<template>
    <div class="product">
        <div>
            <v-btn @click="clickDialogCreateProduct()" color="primary" depressed> <v-icon>mdi-plus</v-icon> Add new
                product</v-btn>
        </div>
        <v-data-table :headers="headers.product" :items="desserts.product" item-key="_id">
            <template v-slot:item.img="{ item }">
                <v-img :src="item.img" contain width="100"></v-img>
            </template>
            <template v-slot:item.name="{ item }">
                <b> {{ item.name }}</b>
                <div>
                    <v-btn @click="clickDialogEditProduct(item)" class="mt-3" text="" outlined color="indigo"
                        small>Edit</v-btn>
                    <v-btn @click="clickDialogDeleteProduct(item)" class="mt-3 ml-3" text="" outlined color="error"
                        small>Delete</v-btn>
                </div>
            </template>
        </v-data-table>
        <!--Dialog create, edit-->
        <v-dialog v-model="dialog.save" max-width="700">
            <v-card>
                <v-card-title class="text-h5">
                    {{ config.titleDialog }}
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <div>Name</div>
                            <v-text-field v-model="form.product.value.name" outlined dense
                                placeholder="Please enter name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div>Image</div>
                            <v-text-field v-model="form.product.value.img" outlined dense
                                placeholder="Please enter image"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div>Description</div>
                            <v-text-field v-model="form.product.value.description" outlined dense
                                placeholder="Please enter description"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div>Price</div>
                            <v-text-field v-model="form.product.value.price" outlined dense
                                placeholder="Please enter price"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="closeSave()">
                        Close
                    </v-btn>

                    <v-btn :disabled="loading.isSave" color="green darken-1" text @click="saveProduct()">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--Dialog delete-->
        <v-dialog v-model="dialog.delete" max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    {{ config.titleDeleteDialog }}
                </v-card-title>

                <v-card-text>
                    {{ config.conentDeleteDialog }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="closeDelete()">
                        Disagree
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deleteProduct()">
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

  
<script lang="ts">
import Vue from "vue";
import Api from "../../api/api";

export default Vue.extend({
    name: "Home",
    components: {},
    data() {
        return {
            config: {
                titleDialog: "",
                titleDeleteDialog: "",
                conentDeleteDialog: "",
                editedIndex: -1,
            },
            form: {
                product: {
                    valid: true,
                    value: {
                        _id: '',
                        name: '',
                        img: '',
                        description: '',
                        price: '',
                    },
                    default: {
                        _id: '',
                        name: '',
                        img: '',
                        description: '',
                        price: '',
                    }
                }
            },
            loading: {
                isSave: false
            },
            dialog: {
                save: false,
                delete: false
            },
            headers: {
                product: [
                    {
                        text: "Image",
                        align: "start",
                        sortable: false,
                        value: "img",
                    },
                    {
                        text: "Name",
                        align: "start",
                        sortable: false,
                        value: "name",
                    },
                ]
            },
            desserts: {
                product: [] as any
            },
        };
    },
    methods: {
        // click
        async clickDialogCreateProduct() {
            let that = this;
            that.config.titleDialog = "Add New Product";
            that.dialog.save = true;
        },
        async clickDialogEditProduct(item: any) {
            let that = this;
            that.config.titleDialog = "Edit Product";
            that.config.editedIndex = that.desserts.product.indexOf(item);
            that.form.product.value = Object.assign({}, item);
            that.dialog.save = true;
        },
        async clickDialogDeleteProduct(item: any) {
            let that = this;
            that.config.titleDeleteDialog = 'Delete';
            that.config.conentDeleteDialog = `Are you sure you want to remove the product [${item.name}] from the list ?`;
            that.config.editedIndex = this.desserts.product.indexOf(item);
            that.form.product.value = Object.assign({}, item);
            that.dialog.delete = true;
        },
        // close
        async closeSave() {
            let that = this;
            that.dialog.save = false;
            that.$nextTick(() => {
                that.form.product.value = Object.assign({}, that.form.product.default);
                that.config.editedIndex = -1;
            })
        },
        async closeDelete() {
            let that = this
            that.dialog.delete = false
            this.$nextTick(() => {
                this.form.product.value = Object.assign({}, that.form.product.default)
                this.config.editedIndex = -1
            })
        },
        // action
        async saveProduct() {
            let that = this;

            that.loading.isSave = true;

            const formData = new FormData()
            formData.append('name', that.form.product.value.name);
            formData.append('img', that.form.product.value.img);
            formData.append('description', that.form.product.value.description);
            formData.append('price', that.form.product.value.price);
            console.log(that.form.product.value);

            if (that.config.editedIndex > -1) {
                const editProduct = await Api.Edit(formData, {
                    _id: that.form.product.value._id,
                })

                switch (editProduct.status) {
                    case 200:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: editProduct.message,
                            status: 'success',
                        })

                        Object.assign(that.desserts.product[that.config.editedIndex], editProduct.data);
                        that.closeSave();
                        that.loadProduct();
                        break
                    case 400:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: editProduct.message,
                            status: 'warning',
                        })
                        break
                    default:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: editProduct.message,
                            status: 'error',
                        })
                }
            } else {
                const addProduct = await Api.Add(formData)
                switch (addProduct.status) {
                    case 200:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: addProduct.message,
                            status: 'success',
                        })

                        that.desserts.product.unshift(addProduct.data)
                        that.closeSave()
                        break
                    case 400:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: addProduct.message,
                            status: 'warning',
                        })
                        break
                    default:
                        that.$emit('snackbarEmit', {
                            snackbar: true,
                            text: addProduct.message,
                            status: 'error',
                        })
                }
            }

            that.loading.isSave = false
        },
        async deleteProduct() {
            let that = this;
            that.loading.isSave = true;
            const deleteProduct = await Api.Delete({
                _id: that.form.product.value._id,
            })

            console.log(that.form.product.value._id);

            switch (deleteProduct.status) {
                case 200:
                    that.$emit('snackbarEmit', {
                        snackbar: true,
                        text: deleteProduct.message,
                        status: 'success',
                    })

                    that.desserts.product.splice(that.config.editedIndex, 1);
                    that.closeDelete();

                    that.loadProduct();
                    break
                case 400:
                    that.$emit('snackbarEmit', {
                        snackbar: true,
                        text: deleteProduct.message,
                        status: 'warning',
                    })
                    break
                default:
                    that.$emit('snackbarEmit', {
                        snackbar: true,
                        text: deleteProduct.message,
                        status: 'error',
                    })
            }

            that.loading.isSave = false;
        },
        // load
        async loadProduct() {
            let that = this;
            const call = await Api.GetAll();
            that.desserts.product = call.data;
        }
    },
    created() {
        let that = this;
        that.loadProduct();
    }
});
</script>

<style scoped lang="scss">
.product {
    padding: 20px;
}
</style>
  