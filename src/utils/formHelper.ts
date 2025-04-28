export function getFormInputValueByName(form: HTMLFormElement, name: string): string {
    const control = form.elements.namedItem(name) as HTMLInputElement;
  
    if (!control || control instanceof RadioNodeList || !("value" in control)) {
        throw new Error(`Form control "${name}" not found or was a RadioNodeList`);
    }
  
    return control.value;
  }
  