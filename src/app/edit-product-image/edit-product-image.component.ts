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
    if (!inputElement.files?.length) return;
  
    const files = Array.from(inputElement.files);
  
    const totalImages = this.selectedFiles.length + files.length;
    if (totalImages > 6) {
      alert('No puedes seleccionar más de 6 imágenes.');
      return;
    }
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrls.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
  
      this.selectedFiles.push(file);
    });
  
    // Emitir los archivos seleccionados al componente padre
    this.filesSelected.emit(this.selectedFiles);
  
    // Resetear el input
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