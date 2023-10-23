import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    locale: {
        type: PropType<EAuthLocales>;
        default: any;
    };
    apiUrl: {
        type: StringConstructor;
    };
    gql: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    t: any;
    logo: any;
    phoneMask: any;
    unmaskPhone: any;
    form: {
        username: string;
        password: string;
    };
    handleSubmit: () => void;
    state: {
        loading: boolean;
        showPassword: boolean;
        error: boolean;
        errorMessage: string;
    };
    toggleShowPassword: () => boolean;
    isDisabled: import("vue").ComputedRef<boolean>;
    handlePasswordKeyUp: (event: KeyboardEvent) => void;
    isCapsLockOn: import("vue").Ref<boolean>;
    isFormValidated: import("vue").Ref<boolean>;
    isFormValid: import("vue").ComputedRef<number>;
    isUsernameValid: import("vue").ComputedRef<number>;
    isPasswordValid: import("vue").ComputedRef<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    locale: {
        type: PropType<EAuthLocales>;
        default: any;
    };
    apiUrl: {
        type: StringConstructor;
    };
    gql: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    locale: EAuthLocales;
    gql: boolean;
}, {}>;
export default _default;
