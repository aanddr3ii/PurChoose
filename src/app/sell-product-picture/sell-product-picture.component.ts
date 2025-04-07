import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sell-product-picture',
  standalone: true,
  imports: [],
  templateUrl: './sell-product-picture.component.html',
  styleUrl: './sell-product-picture.component.css',
})
export class SellProductPictureComponent {
  // Emitir las imágenes seleccionadas al componente padre
  @Output() filesSelected = new EventEmitter<File[]>();

  // Lista de URLs de vista previa para las imágenes
  imagePreviewUrls: string[] = [];

  // Lista de archivos seleccionados
  selectedFiles: File[] = [];

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

    // Notificar al componente padre sobre los archivos seleccionados
    this.filesSelected.emit(this.selectedFiles);

    // Limpiar el input para permitir volver a seleccionar archivos
    inputElement.value = '';
  }

  // Método para eliminar una imagen específica
  removeImage(index: number): void {
    this.imagePreviewUrls.splice(index, 1); // Eliminar la vista previa
    this.selectedFiles.splice(index, 1); // Eliminar el archivo correspondiente
    this.filesSelected.emit(this.selectedFiles); // Notificar cambios al componente padre
  }
}