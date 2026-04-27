import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from "@angular/core";
import { VcModal } from "./modal.component";
import { DOCUMENT } from "@angular/common";
import { Subject } from "rxjs";

@Injectable()

export class VcModalService {
    private modalNotifier?: Subject<string>;

    constructor(private resolver: ComponentFactoryResolver, private injector: Injector, @Inject(DOCUMENT) private document: Document) {}

    open(content: TemplateRef<any>, options?: {title?: string, icon?: string, modalType?: string}) {
        const modalComponentFactory = this.resolver.resolveComponentFactory(VcModal);
        const contentViewRef = content.createEmbeddedView(null);
        const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes]);

        console.log("Service title: ", options?.title);
        console.log("Service icon: ", options?.icon);
        console.log("Service modal type: ", options?.modalType);

        if(options!==undefined) {
            modalComponent.instance.title = options?.title;
            modalComponent.instance.icon = options?.icon;
            modalComponent.instance.modalType = options?.modalType;
        }

        console.log(modalComponent.instance.title);
        console.log(modalComponent.instance.icon);
        console.log(modalComponent.instance.modalType);

        modalComponent.instance.submitEvent.subscribe(() => this.submitModal());
        modalComponent.instance.closeEvent.subscribe(() => this.closeModal());

        modalComponent.hostView.detectChanges();

        this.document.body.appendChild(modalComponent.location.nativeElement);

        this.modalNotifier = new Subject();

        return this.modalNotifier?.asObservable();
    }
    
    // open(content: TemplateRef<any>, options?: {title?: string, icon?: string, modalType?: string}) {
    //     const modalComponentFactory = this.resolver.resolveComponentFactory(VcModal);
    //     const contentViewRef = content.createEmbeddedView(null);
    //     const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes]);

    //     console.log("Service title: ", options?.title);
    //     console.log("Service icon: ", options?.icon);
    //     console.log("Service modal type: ", options?.modalType);

    //     if(options!==undefined) {
    //         modalComponent.instance.title = options?.title;
    //         modalComponent.instance.icon = options?.icon;
    //         modalComponent.instance.modalType = options?.modalType;
    //     }

    //     console.log(modalComponent.instance.title);
    //     console.log(modalComponent.instance.icon);
    //     console.log(modalComponent.instance.modalType);

    //     modalComponent.instance.submitEvent.subscribe(() => this.submitModal());
    //     modalComponent.instance.closeEvent.subscribe(() => this.closeModal());

    //     modalComponent.hostView.detectChanges();

    //     this.document.body.appendChild(modalComponent.location.nativeElement);

    //     this.modalNotifier = new Subject();

    //     return this.modalNotifier?.asObservable();
    // }

    submitModal() {
        this.modalNotifier?.next('confirm');
        this.closeModal();
    }

    closeModal() {
        this.modalNotifier?.complete();
    }
}