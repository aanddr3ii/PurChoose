import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { AdminService } from '../services/admin/admin.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    NavBeltComponent,
    NavCategoriesComponent
  ],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  products = signal<Product[]>([]);
  editingProductIndex: number | null = null;
  editingProduct: Product | null = null;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('🔄 Cargando productos...');
    this.adminService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
      }
    });
  }

  getCategoryNames(product: Product): string {
    if (!product.categorias || product.categorias.length === 0) return '-';
    const names = product.categorias.map(c => c.nombre).join(', ');
    return names;
  }

  backToAdminMenu(): void {
    console.log('⬅️ Volviendo al menú de administración');
    this.router.navigate(['/admin']);
  }

  startEdit(index: number): void {
    console.log('✏️ Iniciando edición del índice:', index);

    const product = this.products()[index];

    if (!product) {
      console.warn('⚠️ Producto no encontrado en índice:', index);
      return;
    }

    // Copia segura del producto
    this.editingProductIndex = index;
    this.editingProduct = {
      id: product.id,
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio || 0,
      estado: product.estado || '',
      oferta: !!product.oferta,
      ubicacion: product.ubicacion || '',
      user_id: product.user_id || 0,
      categorias: product.categorias || [],
    };

    console.log('📝 Producto copiado para edición:', this.editingProduct);
  }

  cancelEdit(): void {
    console.log('🚫 Edición cancelada');
    this.editingProductIndex = null;
    this.editingProduct = null;
  }

  saveEdit(): void {
    console.log('💾 Método saveEdit() llamado');

    if (this.editingProductIndex === null || !this.editingProduct) {
      console.warn('⚠️ No hay producto seleccionado para guardar');
      alert('No hay producto seleccionado para guardar.');
      return;
    }

    const productId = this.products()[this.editingProductIndex]?.id;
    if (!productId) {
      console.error('❌ ID no válido:', productId);
      alert('El producto no tiene un ID válido.');
      return;
    }

    // Asegurar booleano
    this.editingProduct.oferta = Boolean(this.editingProduct.oferta);

    console.log('📤 Enviando actualización:', this.editingProduct);

    this.adminService.updateProduct(productId, this.editingProduct).subscribe({
      next: (updatedProduct) => {
        console.log('✅ Producto actualizado:', updatedProduct);
        const updatedList = [...this.products()];
        updatedList[this.editingProductIndex!] = updatedProduct;
        this.products.set(updatedList);
        this.cancelEdit();
      },
      error: (err) => {
        console.error('❌ Error al actualizar producto:', err);
        alert('Hubo un error al guardar los cambios');
      }
    });
  }

  deleteProduct(index: number): void {
    const productId = this.products()[index].id;
    if (!productId) {
      console.error('❌ ID no válido para eliminar:', productId);
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      console.log('🗑️ Eliminando producto con ID:', productId);

      this.adminService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('✅ Producto eliminado:', productId);
          const updatedList = this.products().filter((_, i) => i !== index);
          this.products.set(updatedList);
        },
        error: (err) => {
          console.error('❌ Error al eliminar producto:', err);
          alert('Hubo un error al eliminar el producto');
        }
      });
    }
  }
}