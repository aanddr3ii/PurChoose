import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sell-product-picture',
  standalone: true,
  imports: [],
  templateUrl: './sell-product-picture.component.html',
  styleUrl: './sell-product-picture.component.css'
})
export class SellProductPictureComponent {
// Emit the selected file so the parent can store or upload it
@Output() fileSelected = new EventEmitter<File | null>();

// Store a data URL for the image preview
imagePreviewUrl: string | ArrayBuffer | null = null;

onFileSelect(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files?.length) {
    this.fileSelected.emit(null);
    return;
  }

  const file = inputElement.files[0];
  if (file) {
    // Convert the file to a Base64 data URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = e.target?.result ?? null;
    };
    reader.readAsDataURL(file);

    // Notify parent of the selected file
    this.fileSelected.emit(file);
  }
}


}
