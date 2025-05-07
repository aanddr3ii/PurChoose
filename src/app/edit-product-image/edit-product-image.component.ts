import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductImageService } from '../services/ProductImage/product-image.service';

@Component({
  selector: 'app-edit-product-image',
  standalone: true,
  imports: [],
  templateUrl: './edit-product-image.component.html',
  styleUrl: './edit-product-image.component.css'
})

export class EditProductImageComponent {
  // Archivos seleccionados por el usuario
  selectedFiles: File[] = [];

  // URLs de vista previa de las imágenes
  imagePreviewUrls: string[] = [];

  // Emitter para notificar al componente padre los archivos seleccionados
  @Output() filesSelected = new EventEmitter<File[]>();

  constructor(
    private route: ActivatedRoute,
    private productImageService: ProductImageService
  ) {}

  /**
   * Al inicializar el componente, obtener las imágenes del producto por ID.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (!id) return;

      // Llamada al servicio para recuperar imágenes desde el backend
      this.productImageService.getImagesByProductIdedit(id).subscribe((urls: string[]) => {
        this.imagePreviewUrls = urls;
      });
    });
  }

  /**
   * Maneja la selección de imágenes desde el input file.
   * @param event Evento de cambio del input file
   */
  onFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files?.length) {
      return;
    }

    // Obtener los archivos seleccionados
    const files = Array.from(inputElement.files);

    // Verificar el límite de 6 imágenes
    const totalImages = this.selectedFiles.length + files.length;
    if (totalImages > 6) {
      alert('No puedes seleccionar más de 6 imágenes.');
      return;
    }

    // Procesar cada archivo
    files.forEach((file) => {
      // Convertir el archivo a una URL de vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrls.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Guardar el archivo seleccionado
      this.selectedFiles.push(file);
    });

    // Limpiar el input para permitir volver a seleccionar archivos
    inputElement.value = '';
  }

  
  removeImage(index: number): void {
    const imageUrl = this.imagePreviewUrls[index];
  
    // Extraer solo el nombre del archivo
    const imageName = imageUrl.split('/').pop();
  
    if (!imageName) return;
  
    this.productImageService.deleteImageByUrl(imageName).subscribe({
      next: () => {
        this.imagePreviewUrls.splice(index, 1);
        this.selectedFiles.splice(index, 1);
      },
      error: (err) => {
        console.error('Error eliminando la imagen:', err);
      },
    });
  }
  
 
}