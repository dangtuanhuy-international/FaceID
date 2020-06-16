import { Component, OnInit } from "@angular/core";
import { FingerprintAuth, BiometricIDAvailableResult } from "nativescript-fingerprint-auth";
import * as ApplicationSettings from "tns-core-modules/application-settings";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private fingerprintAuth: FingerprintAuth;

    constructor() {
        // Use the component constructor to inject providers.
        this.fingerprintAuth = new FingerprintAuth();
    }

    ngOnInit(): void {
        // Init your component properties here.
        let isFingerprintEnabled = ApplicationSettings.getBoolean("enabled", false);
        let isFaceIdEnable = ApplicationSettings.getBoolean("enable", false);
        if (isFingerprintEnabled) {
            this.fingerprintAuth.available().then(available => {
                this.fingerprintAuth.verifyFingerprintWithCustomFallback({
                    fallbackMessage: "Enter Your Device Password",
                    message: "Authenticate via a Fingerprint"
                }).then(() => {
                    alert('Luna');
                }, () => {
                    alert('Mirai');
                });
            });
        } 
        // else {
        //     this.fingerprintAuth.available().then((result: BiometricIDAvailableResult) => {
        //         console.log(`Biometric ID available? ${result.any}`);
        //         console.log(`Touch? ${result.touch}`);
        //         console.log(`Face? ${result.face}`);
        //     });
        // }
    }
    public toggleFingerprint() {
        let isFingerprintEnabled = ApplicationSettings.getBoolean("enabled", false);
        ApplicationSettings.setBoolean("enabled", !isFingerprintEnabled);
    }
}
