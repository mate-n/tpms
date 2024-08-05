package tpms.backend_middleware.services;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class DropdownService {

    public List<Map<String, Object>> getGuestTypes() {
        return Arrays.asList(
                Map.of("id", 2, "value", "Company"),
                Map.of("id", 3, "value", "Group"),
                Map.of("id", 1, "value", "Private"),
                Map.of("id", 5, "value", "Source"),
                Map.of("id", 4, "value", "Travel Agency")
        );
    }

    public List<Map<String, Object>> getGuestMarketCodes() {
        return Arrays.asList(
                Map.of("id", 151, "value", "WBE Login")
        );
    }

    public List<Map<String, Object>> getSalutations() {
        return Arrays.asList(
                Map.of("id", 13, "value", "CO"),
                Map.of("id", 15, "value", "Dr."),
                Map.of("id", 73, "value", "Family"),
                Map.of("id", 11, "value", "Mr."),
                Map.of("id", 10, "value", "Mrs."),
                Map.of("id", 12, "value", "Prof.")
        );
    }

    public List<Map<String, Object>> getLanguages() {
        return Arrays.asList(
                Map.of("id", "af_ZA", "value", "Afrikaans"),
                Map.of("id", "sq_AL", "value", "Albanian"),
                Map.of("id", "ar_SA", "value", "Arabic"),
                Map.of("id", "ar_EG", "value", "Arabic (Egypt)"),
                Map.of("id", "hy_AM", "value", "Armenian"),
                Map.of("id", "az_AZ", "value", "Azeri"),
                Map.of("id", "be_BY", "value", "Belarusian"),
                Map.of("id", "en_GB", "value", "British English"),
                Map.of("id", "bg_BG", "value", "Bulgarian"),
                Map.of("id", "en_CA", "value", "Canadian English"),
                Map.of("id", "fr_CA", "value", "Canadian French"),
                Map.of("id", "ca_ES", "value", "Catalan"),
                Map.of("id", "zh_CN", "value", "Chinese (Simplified)"),
                Map.of("id", "zh_TW", "value", "Chinese (Traditional)"),
                Map.of("id", "hr_HR", "value", "Croatian"),
                Map.of("id", "cs_CZ", "value", "Czech"),
                Map.of("id", "da_DK", "value", "Danish"),
                Map.of("id", "nl_NL", "value", "Dutch"),
                Map.of("id", "en_US", "value", "English"),
                Map.of("id", "et_EE", "value", "Estonian"),
                Map.of("id", "fo_FO", "value", "Faroese"),
                Map.of("id", "fa_IR", "value", "Farsi"),
                Map.of("id", "fi_FI", "value", "Finnish"),
                Map.of("id", "fr_FR", "value", "French"),
                Map.of("id", "gl_ES", "value", "Galician"),
                Map.of("id", "ka_GE", "value", "Georgian"),
                Map.of("id", "de_DE", "value", "German"),
                Map.of("id", "el_GR", "value", "Greek"),
                Map.of("id", "gu_IN", "value", "Gujarati"),
                Map.of("id", "he_IL", "value", "Hebrew"),
                Map.of("id", "hi_IN", "value", "Hindi"),
                Map.of("id", "hu_HU", "value", "Hungarian"),
                Map.of("id", "is_IS", "value", "Icelandic"),
                Map.of("id", "id_ID", "value", "Indonesian"),
                Map.of("id", "it_IT", "value", "Italian"),
                Map.of("id", "ja_JP", "value", "Japanese"),
                Map.of("id", "kn_IN", "value", "Kannada"),
                Map.of("id", "kk_KZ", "value", "Kazakh"),
                Map.of("id", "ko_KR", "value", "Korean"),
                Map.of("id", "ky_KG", "value", "Kyrgyz"),
                Map.of("id", "lv_LV", "value", "Latvian"),
                Map.of("id", "lt_LT", "value", "Lithuanian"),
                Map.of("id", "mk_MK", "value", "Macedonian"),
                Map.of("id", "ms_MY", "value", "Malay"),
                Map.of("id", "mr_IN", "value", "Marathi"),
                Map.of("id", "mn_MN", "value", "Mongolian"),
                Map.of("id", "nn_NO", "value", "Norwegian"),
                Map.of("id", "pl_PL", "value", "Polish"),
                Map.of("id", "pt_PT", "value", "Portuguese"),
                Map.of("id", "pa_IN", "value", "Punjabi"),
                Map.of("id", "ro_RO", "value", "Romanian"),
                Map.of("id", "ru_RU", "value", "Russian"),
                Map.of("id", "sa_IN", "value", "Sanskrit"),
                Map.of("id", "sr_SP", "value", "Serbian"),
                Map.of("id", "sk_SK", "value", "Slovak"),
                Map.of("id", "sl_SI", "value", "Slovenian"),
                Map.of("id", "es_ES", "value", "Spanish"),
                Map.of("id", "sw_KE", "value", "Swahili"),
                Map.of("id", "sv_SE", "value", "Swedish"),
                Map.of("id", "ta_IN", "value", "Tamil"),
                Map.of("id", "tt_RU", "value", "Tatar"),
                Map.of("id", "te_IN", "value", "Telugu"),
                Map.of("id", "th_TH", "value", "Thai"),
                Map.of("id", "tr_TR", "value", "Turkish"),
                Map.of("id", "uk_UA", "value", "Ukrainian"),
                Map.of("id", "ur_PK", "value", "Urdu"),
                Map.of("id", "uz_UZ", "value", "Uzbek"),
                Map.of("id", "vi_VN", "value", "Vietnamese")
        );
    }

    public List<Map<String, Object>> getKeywords() {
        return Arrays.asList(
                Map.of("id", 155, "value", "Business"),
                Map.of("id", 157, "value", "Golfer"),
                Map.of("id", 159, "value", "Prospektanfrage")
        );
    }

    public List<Map<String, Object>> getFeatures() {
        return Arrays.asList(
                Map.of("id", 1, "value", "King Bed"),
                Map.of("id", 2, "value", "Twin Bed")
        );
    }

    public List<Map<String, Object>> getRates() {
        return Arrays.asList(
                Map.of("id", 1, "value", "Rack BB", "isDefault", true, "confidential", false),
                Map.of("id", 2, "value", "STO 10%", "isDefault", false, "confidential", false)
        );
    }

    public List<Map<String, Object>> getCountries() {
        return Arrays.asList(
                Map.of("id", "AX", "value", "Aaland Islands"),
                Map.of("id", "AF", "value", "Afghanistan"),
                Map.of("id", "AL", "value", "Albania"),
                Map.of("id", "DZ", "value", "Algeria"),
                Map.of("id", "AS", "value", "American Samoa"),
                Map.of("id", "AD", "value", "Andorra"),
                Map.of("id", "AO", "value", "Angola"),
                Map.of("id", "AI", "value", "Anguilla"),
                Map.of("id", "AQ", "value", "Antarctic"),
                Map.of("id", "AG", "value", "Antigua and Barbuda"),
                Map.of("id", "AR", "value", "Argentina"),
                Map.of("id", "AM", "value", "Armenia"),
                Map.of("id", "AW", "value", "Aruba"),
                Map.of("id", "AU", "value", "Australia"),
                Map.of("id", "AT", "value", "Austria"),
                Map.of("id", "AZ", "value", "Azerbaijan"),
                Map.of("id", "BS", "value", "Bahamas"),
                Map.of("id", "BH", "value", "Bahrain"),
                Map.of("id", "BD", "value", "Bangladesh"),
                Map.of("id", "BB", "value", "Barbados"),
                Map.of("id", "BY", "value", "Belarus"),
                Map.of("id", "BE", "value", "Belgium"),
                Map.of("id", "BZ", "value", "Belize"),
                Map.of("id", "BJ", "value", "Benin"),
                Map.of("id", "BM", "value", "Bermuda"),
                Map.of("id", "BT", "value", "Bhutan"),
                Map.of("id", "BO", "value", "Bolivia"),
                Map.of("id", "BQ", "value", "Bonaire"),
                Map.of("id", "BA", "value", "Bosnia and Herzegovina"),
                Map.of("id", "BW", "value", "Botswana"),
                Map.of("id", "BV", "value", "Bouvet Island"),
                Map.of("id", "BR", "value", "Brazil"),
                Map.of("id", "IO", "value", "British Indian Ocean Territory"),
                Map.of("id", "VG", "value", "British Virgin Islands"),
                Map.of("id", "BN", "value", "Brunei Darussalam"),
                Map.of("id", "BG", "value", "Bulgaria"),
                Map.of("id", "BF", "value", "Burkina Faso"),
                Map.of("id", "BI", "value", "Burundi"),
                Map.of("id", "KH", "value", "Cambodia"),
                Map.of("id", "CM", "value", "Cameroon"),
                Map.of("id", "CA", "value", "Canada"),
                Map.of("id", "CV", "value", "Cape Verde"),
                Map.of("id", "AN", "value", "Caribbean Netherlands"),
                Map.of("id", "KY", "value", "Cayman islands"),
                Map.of("id", "CF", "value", "Central African Republic"),
                Map.of("id", "TD", "value", "Chad"),
                Map.of("id", "CL", "value", "Chile"),
                Map.of("id", "CN", "value", "China"),
                Map.of("id", "CX", "value", "Christmas Island"),
                Map.of("id", "CC", "value", "Cocos Islands"),
                Map.of("id", "CO", "value", "Colombia"),
                Map.of("id", "KM", "value", "Comoros"),
                Map.of("id", "CD", "value", "Congo, Democratic"),
                Map.of("id", "CG", "value", "Congo, Republic"),
                Map.of("id", "CK", "value", "Cook Islands"),
                Map.of("id", "CR", "value", "Costa Rica"),
                Map.of("id", "CI", "value", "Cote dIvoire"),
                Map.of("id", "HR", "value", "Croatia"),
                Map.of("id", "CU", "value", "Cuba"),
                Map.of("id", "CW", "value", "Curacao"),
                Map.of("id", "CY", "value", "Cyprus"),
                Map.of("id", "CZ", "value", "Czech Republic"),
                Map.of("id", "DK", "value", "Denmark"),
                Map.of("id", "DJ", "value", "Djibouti"),
                Map.of("id", "DM", "value", "Dominica"),
                Map.of("id", "DO", "value", "Dominican Republic"),
                Map.of("id", "EC", "value", "Ecuador"),
                Map.of("id", "EG", "value", "Egypt"),
                Map.of("id", "SV", "value", "El Salvador"),
                Map.of("id", "GQ", "value", "Equatorial Guinea"),
                Map.of("id", "ER", "value", "Eritrea"),
                Map.of("id", "EE", "value", "Estonia"),
                Map.of("id", "ET", "value", "Ethiopia"),
                Map.of("id", "FK", "value", "Falkland Islands"),
                Map.of("id", "FO", "value", "Faroe Islands"),
                Map.of("id", "FJ", "value", "Fiji"),
                Map.of("id", "FI", "value", "Finland"),
                Map.of("id", "FR", "value", "France"),
                Map.of("id", "SJ", "value", "Franz Joseph Land"),
                Map.of("id", "GF", "value", "French Guiana"),
                Map.of("id", "PF", "value", "French Polynesia"),
                Map.of("id", "TF", "value", "French Southern and Antarctic Lands"),
                Map.of("id", "GA", "value", "Gabon"),
                Map.of("id", "GM", "value", "Gambia"),
                Map.of("id", "GE", "value", "Georgia"),
                Map.of("id", "DE", "value", "Germany"),
                Map.of("id", "GH", "value", "Ghana"),
                Map.of("id", "GI", "value", "Gibraltar"),
                Map.of("id", "GR", "value", "Greece"),
                Map.of("id", "GL", "value", "Greenland"),
                Map.of("id", "GD", "value", "Grenada"),
                Map.of("id", "GP", "value", "Guadeloupe"),
                Map.of("id", "GU", "value", "Guam"),
                Map.of("id", "GT", "value", "Guatemala"),
                Map.of("id", "GG", "value", "Guernsey"),
                Map.of("id", "GN", "value", "Guinea"),
                Map.of("id", "GW", "value", "Guinea-Bissau"),
                Map.of("id", "GY", "value", "Guyana"),
                Map.of("id", "HT", "value", "Haiti"),
                Map.of("id", "HM", "value", "Heard Island and McDonald Islands"),
                Map.of("id", "VA", "value", "Holy See Vatican City State"),
                Map.of("id", "HN", "value", "Honduras"),
                Map.of("id", "HK", "value", "Hongkong"),
                Map.of("id", "HU", "value", "Hungary"),
                Map.of("id", "IS", "value", "Iceland"),
                Map.of("id", "IN", "value", "India"),
                Map.of("id", "ID", "value", "Indonesia"),
                Map.of("id", "IR", "value", "Iran"),
                Map.of("id", "IQ", "value", "Iraq"),
                Map.of("id", "IE", "value", "Ireland"),
                Map.of("id", "IM", "value", "Isle of Man"),
                Map.of("id", "IL", "value", "Israel"),
                Map.of("id", "IT", "value", "Italy"),
                Map.of("id", "JM", "value", "Jamaica"),
                Map.of("id", "JP", "value", "Japan"),
                Map.of("id", "JE", "value", "Jersey"),
                Map.of("id", "JO", "value", "Jordan"),
                Map.of("id", "KZ", "value", "Kazakhstan"),
                Map.of("id", "KE", "value", "Kenya"),
                Map.of("id", "KI", "value", "Kiribati"),
                Map.of("id", "KP", "value", "Korea North"),
                Map.of("id", "KR", "value", "Korea South"),
                Map.of("id", "KW", "value", "Kuwait"),
                Map.of("id", "KG", "value", "Kyrgyz Republic"),
                Map.of("id", "LA", "value", "Lao Peoples Democratic Republic"),
                Map.of("id", "LV", "value", "Latvia"),
                Map.of("id", "LB", "value", "Lebanon"),
                Map.of("id", "LS", "value", "Lesotho"),
                Map.of("id", "LR", "value", "Liberia"),
                Map.of("id", "LY", "value", "Libyan Arab Jamahiriya"),
                Map.of("id", "LI", "value", "Liechtenstein"),
                Map.of("id", "LT", "value", "Lithuania"),
                Map.of("id", "LU", "value", "Luxembourg"),
                Map.of("id", "MO", "value", "Macao"),
                Map.of("id", "MK", "value", "Macedonia"),
                Map.of("id", "MG", "value", "Madagascar"),
                Map.of("id", "MW", "value", "Malawi"),
                Map.of("id", "MY", "value", "Malaysia"),
                Map.of("id", "MV", "value", "Maldives"),
                Map.of("id", "ML", "value", "Mali"),
                Map.of("id", "MT", "value", "Malta"),
                Map.of("id", "MH", "value", "Marshall Islands"),
                Map.of("id", "MQ", "value", "Martinique"),
                Map.of("id", "MR", "value", "Mauritania"),
                Map.of("id", "MU", "value", "Mauritius"),
                Map.of("id", "YT", "value", "Mayotte"),
                Map.of("id", "MX", "value", "Mexico"),
                Map.of("id", "FM", "value", "Micronesia"),
                Map.of("id", "MD", "value", "Moldova"),
                Map.of("id", "MC", "value", "Monaco"),
                Map.of("id", "MN", "value", "Mongolia"),
                Map.of("id", "ME", "value", "Montenegro"),
                Map.of("id", "MS", "value", "Montserrat"),
                Map.of("id", "MA", "value", "Morocco"),
                Map.of("id", "MZ", "value", "Mozambique"),
                Map.of("id", "MM", "value", "Myanmar"),
                Map.of("id", "NA", "value", "Namibia"),
                Map.of("id", "NR", "value", "Nauru"),
                Map.of("id", "NP", "value", "Nepal"),
                Map.of("id", "NL", "value", "Netherlands"),
                Map.of("id", "NC", "value", "New Caledonia"),
                Map.of("id", "NZ", "value", "New Zealand"),
                Map.of("id", "NI", "value", "Nicaragua"),
                Map.of("id", "NE", "value", "Niger"),
                Map.of("id", "NG", "value", "Nigeria"),
                Map.of("id", "NU", "value", "Niue"),
                Map.of("id", "NF", "value", "Norfolk island"),
                Map.of("id", "MP", "value", "Northern Mariana Islands"),
                Map.of("id", "NO", "value", "Norway"),
                Map.of("id", "OM", "value", "Oman"),
                Map.of("id", "PK", "value", "Pakistan"),
                Map.of("id", "PW", "value", "Palau"),
                Map.of("id", "PS", "value", "Palestinian territories"),
                Map.of("id", "PA", "value", "Panama"),
                Map.of("id", "PG", "value", "Papua New Guinea"),
                Map.of("id", "PY", "value", "Paraguay"),
                Map.of("id", "PE", "value", "Peru"),
                Map.of("id", "PH", "value", "Philippines"),
                Map.of("id", "PN", "value", "Pitcairn"),
                Map.of("id", "PL", "value", "Poland"),
                Map.of("id", "PT", "value", "Portugal"),
                Map.of("id", "PR", "value", "Puerto Rico"),
                Map.of("id", "QA", "value", "Qatar"),
                Map.of("id", "UM", "value", "Remaining pacific islands of USA"),
                Map.of("id", "XK", "value", "Republic of Kosovo"),
                Map.of("id", "RO", "value", "Romania"),
                Map.of("id", "RU", "value", "Russian Federation"),
                Map.of("id", "RW", "value", "Rwanda"),
                Map.of("id", "RE", "value", "Réunion"),
                Map.of("id", "BL", "value", "Saint Barthelemy"),
                Map.of("id", "KN", "value", "Saint Kitts and Nevis"),
                Map.of("id", "LC", "value", "Saint Lucia"),
                Map.of("id", "MF", "value", "Saint Martin"),
                Map.of("id", "PM", "value", "Saint Pierre and Miquelon"),
                Map.of("id", "VC", "value", "Saint Vincent and the Grenadines"),
                Map.of("id", "WS", "value", "Samoa"),
                Map.of("id", "SM", "value", "San Marino"),
                Map.of("id", "ST", "value", "Sao Tome and Principe"),
                Map.of("id", "SA", "value", "Saudi Arabia"),
                Map.of("id", "SN", "value", "Senegal"),
                Map.of("id", "RS", "value", "Serbia"),
                Map.of("id", "SC", "value", "Seychelles"),
                Map.of("id", "SL", "value", "Sierra Leone"),
                Map.of("id", "SG", "value", "Singapore"),
                Map.of("id", "SX", "value", "Sint Maarten (NL)"),
                Map.of("id", "SK", "value", "Slovakia"),
                Map.of("id", "SI", "value", "Slovenia"),
                Map.of("id", "SB", "value", "Solomon Islands"),
                Map.of("id", "SO", "value", "Somalia"),
                Map.of("id", "ZA", "value", "South Africa"),
                Map.of("id", "SS", "value", "South Sudan"),
                Map.of("id", "GS", "value", "South-Georgia"),
                Map.of("id", "ES", "value", "Spain"),
                Map.of("id", "LK", "value", "Sri Lanka"),
                Map.of("id", "SH", "value", "St. Helena"),
                Map.of("id", "SD", "value", "Sudan"),
                Map.of("id", "SR", "value", "Suriname"),
                Map.of("id", "SZ", "value", "Swaziland"),
                Map.of("id", "SE", "value", "Sweden"),
                Map.of("id", "CH", "value", "Switzerland"),
                Map.of("id", "SY", "value", "Syrian"),
                Map.of("id", "TW", "value", "Taiwan"),
                Map.of("id", "TJ", "value", "Tajikistan"),
                Map.of("id", "TZ", "value", "Tanzania"),
                Map.of("id", "TH", "value", "Thailand"),
                Map.of("id", "TL", "value", "Timor-Leste"),
                Map.of("id", "TG", "value", "Togo"),
                Map.of("id", "TK", "value", "Tokelau"),
                Map.of("id", "TO", "value", "Tonga"),
                Map.of("id", "TT", "value", "Trinidad and Tobago"),
                Map.of("id", "TN", "value", "Tunisia"),
                Map.of("id", "TR", "value", "Turkey"),
                Map.of("id", "TM", "value", "Turkmenistan"),
                Map.of("id", "TC", "value", "Turks and Caicos Islands"),
                Map.of("id", "TV", "value", "Tuvalu"),
                Map.of("id", "UG", "value", "Uganda"),
                Map.of("id", "UA", "value", "Ukraine"),
                Map.of("id", "AE", "value", "United Arab Emirates"),
                Map.of("id", "GB", "value", "United Kingdom"),
                Map.of("id", "US", "value", "United States of America"),
                Map.of("id", "VI", "value", "United States Virgin Islands"),
                Map.of("id", "UY", "value", "Uruguay"),
                Map.of("id", "UZ", "value", "Uzbekistan"),
                Map.of("id", "VU", "value", "Vanuatu"),
                Map.of("id", "VE", "value", "Venezuela"),
                Map.of("id", "VN", "value", "Vietnam"),
                Map.of("id", "WF", "value", "Wallis and Futuna"),
                Map.of("id", "EH", "value", "Western Sahara"),
                Map.of("id", "YE", "value", "Yemen"),
                Map.of("id", "ZM", "value", "Zambia"),
                Map.of("id", "ZW", "value", "Zimbabwe")
        );
    }

    public List<Map<String, Object>> getNationalities() {
        return Arrays.asList(
                Map.of("id", "ZA", "value", "South African"),
                Map.of("id", "AX", "value", "Aaland Islands"),
                Map.of("id", "AF", "value", "Afghan"),
                Map.of("id", "AL", "value", "Albanian"),
                Map.of("id", "DZ", "value", "Algerian"),
                Map.of("id", "US", "value", "American"),
                Map.of("id", "AS", "value", "American Samoa"),
                Map.of("id", "AD", "value", "Andorran"),
                Map.of("id", "AO", "value", "Angolan"),
                Map.of("id", "AI", "value", "Anguilla"),
                Map.of("id", "AQ", "value", "Antarctic"),
                Map.of("id", "AG", "value", "Antiguans, Barbudans"),
                Map.of("id", "AR", "value", "Argentinean"),
                Map.of("id", "AM", "value", "Armenian"),
                Map.of("id", "AW", "value", "Aruba"),
                Map.of("id", "AU", "value", "Australian"),
                Map.of("id", "AT", "value", "Austrian"),
                Map.of("id", "AZ", "value", "Azerbaijani"),
                Map.of("id", "BS", "value", "Bahamian"),
                Map.of("id", "BH", "value", "Bahraini"),
                Map.of("id", "BD", "value", "Bangladeshi"),
                Map.of("id", "BB", "value", "Barbadian"),
                Map.of("id", "BY", "value", "Belarusian"),
                Map.of("id", "BE", "value", "Belgian"),
                Map.of("id", "BZ", "value", "Belizean"),
                Map.of("id", "BJ", "value", "Beninese"),
                Map.of("id", "BM", "value", "Bermuda"),
                Map.of("id", "BT", "value", "Bhutanese"),
                Map.of("id", "BO", "value", "Bolivian"),
                Map.of("id", "BQ", "value", "Bonaire"),
                Map.of("id", "BA", "value", "Bosnian, Herzegovinian"),
                Map.of("id", "BV", "value", "Bouvet Island"),
                Map.of("id", "BR", "value", "Brazilian"),
                Map.of("id", "GB", "value", "British"),
                Map.of("id", "IO", "value", "British Indian Ocean Territory"),
                Map.of("id", "VG", "value", "British Virgin Islands"),
                Map.of("id", "BN", "value", "Bruneian"),
                Map.of("id", "BG", "value", "Bulgarian"),
                Map.of("id", "BF", "value", "Burkinabe"),
                Map.of("id", "MM", "value", "Burmese"),
                Map.of("id", "BI", "value", "Burundian"),
                Map.of("id", "KH", "value", "Cambodian"),
                Map.of("id", "CM", "value", "Cameroonian"),
                Map.of("id", "CA", "value", "Canadian"),
                Map.of("id", "CV", "value", "Cape Verdian"),
                Map.of("id", "KY", "value", "Cayman islands"),
                Map.of("id", "CF", "value", "Central African"),
                Map.of("id", "TD", "value", "Chadian"),
                Map.of("id", "CL", "value", "Chilean"),
                Map.of("id", "CN", "value", "Chinese"),
                Map.of("id", "VA", "value", "Christ"),
                Map.of("id", "CX", "value", "Christmas Island"),
                Map.of("id", "CC", "value", "Cocos Islands"),
                Map.of("id", "CO", "value", "Colombian"),
                Map.of("id", "KM", "value", "Comoran"),
                Map.of("id", "CD", "value", "Congolese (CD)"),
                Map.of("id", "CG", "value", "Congolese (CG)"),
                Map.of("id", "CK", "value", "Cook Islands"),
                Map.of("id", "CR", "value", "Costa Rican"),
                Map.of("id", "HR", "value", "Croatian"),
                Map.of("id", "CU", "value", "Cuban"),
                Map.of("id", "CW", "value", "Curacao"),
                Map.of("id", "CY", "value", "Cypriot"),
                Map.of("id", "CZ", "value", "Czech"),
                Map.of("id", "DK", "value", "Danish"),
                Map.of("id", "DJ", "value", "Djibouti"),
                Map.of("id", "DM", "value", "Dominican (DM)"),
                Map.of("id", "DO", "value", "Dominican (DO)"),
                Map.of("id", "NL", "value", "Dutch"),
                Map.of("id", "AN", "value", "Dutch Caribean"),
                Map.of("id", "EC", "value", "Ecuadorean"),
                Map.of("id", "EG", "value", "Egyptian"),
                Map.of("id", "AE", "value", "Emirian"),
                Map.of("id", "GQ", "value", "Equatorial Guinean"),
                Map.of("id", "ER", "value", "Eritrean"),
                Map.of("id", "EE", "value", "Estonian"),
                Map.of("id", "ET", "value", "Ethiopian"),
                Map.of("id", "FK", "value", "Falkland Islands"),
                Map.of("id", "FO", "value", "Faroe Islands"),
                Map.of("id", "FJ", "value", "Fijian"),
                Map.of("id", "PH", "value", "Filipino"),
                Map.of("id", "FI", "value", "Finnish"),
                Map.of("id", "SJ", "value", "Franz Joseph Land"),
                Map.of("id", "FR", "value", "French"),
                Map.of("id", "GF", "value", "French Guiana"),
                Map.of("id", "PF", "value", "French Polynesia"),
                Map.of("id", "TF", "value", "French Southern and Antarctic Lands"),
                Map.of("id", "GA", "value", "Gabonese"),
                Map.of("id", "GM", "value", "Gambian"),
                Map.of("id", "GE", "value", "Georgian"),
                Map.of("id", "DE", "value", "German"),
                Map.of("id", "GH", "value", "Ghanaian"),
                Map.of("id", "GI", "value", "Gibraltar"),
                Map.of("id", "GR", "value", "Greek"),
                Map.of("id", "GL", "value", "Greenland"),
                Map.of("id", "GD", "value", "Grenadian"),
                Map.of("id", "GP", "value", "Guadeloupe"),
                Map.of("id", "GU", "value", "Guam"),
                Map.of("id", "GT", "value", "Guatemalan"),
                Map.of("id", "GG", "value", "Guernsey"),
                Map.of("id", "GN", "value", "Guinean"),
                Map.of("id", "GW", "value", "Guyanese"),
                Map.of("id", "HT", "value", "Haitian"),
                Map.of("id", "HM", "value", "Heard Island and McDonald Islands"),
                Map.of("id", "HN", "value", "Honduran"),
                Map.of("id", "HK", "value", "Hongkong"),
                Map.of("id", "HU", "value", "Hungarian"),
                Map.of("id", "KI", "value", "I-Kiribati"),
                Map.of("id", "IS", "value", "Icelander"),
                Map.of("id", "IN", "value", "Indian"),
                Map.of("id", "ID", "value", "Indonesian"),
                Map.of("id", "IR", "value", "Iranian"),
                Map.of("id", "IQ", "value", "Iraqi"),
                Map.of("id", "IE", "value", "Irish"),
                Map.of("id", "IM", "value", "Isle of Man"),
                Map.of("id", "IL", "value", "Israeli"),
                Map.of("id", "IT", "value", "Italian"),
                Map.of("id", "CI", "value", "Ivorian"),
                Map.of("id", "JM", "value", "Jamaican"),
                Map.of("id", "JP", "value", "Japanese"),
                Map.of("id", "JE", "value", "Jersey"),
                Map.of("id", "JO", "value", "Jordanian"),
                Map.of("id", "KZ", "value", "Kazakhstani"),
                Map.of("id", "KE", "value", "Kenyan"),
                Map.of("id", "KN", "value", "Kittian and Nevisian"),
                Map.of("id", "XK", "value", "Kosovo"),
                Map.of("id", "KW", "value", "Kuwaiti"),
                Map.of("id", "KG", "value", "Kyrgyz"),
                Map.of("id", "LA", "value", "Laotian"),
                Map.of("id", "LV", "value", "Latvian"),
                Map.of("id", "LB", "value", "Lebanese"),
                Map.of("id", "LR", "value", "Liberian"),
                Map.of("id", "LY", "value", "Libyan"),
                Map.of("id", "LI", "value", "Liechtensteiner"),
                Map.of("id", "LT", "value", "Lithuanian"),
                Map.of("id", "LU", "value", "Luxembourger"),
                Map.of("id", "MO", "value", "Macao"),
                Map.of("id", "MK", "value", "Macedonian"),
                Map.of("id", "MG", "value", "Madagascar"),
                Map.of("id", "MW", "value", "Malawian"),
                Map.of("id", "MY", "value", "Malaysian"),
                Map.of("id", "MV", "value", "Maldivian"),
                Map.of("id", "ML", "value", "Malian"),
                Map.of("id", "MT", "value", "Maltese"),
                Map.of("id", "MH", "value", "Marshallese"),
                Map.of("id", "MQ", "value", "Martinique"),
                Map.of("id", "MR", "value", "Mauritanian"),
                Map.of("id", "MU", "value", "Mauritian"),
                Map.of("id", "YT", "value", "Mayotte"),
                Map.of("id", "MX", "value", "Mexican"),
                Map.of("id", "FM", "value", "Micronesian"),
                Map.of("id", "MD", "value", "Moldovan"),
                Map.of("id", "MC", "value", "Monegasque"),
                Map.of("id", "MN", "value", "Mongolian"),
                Map.of("id", "ME", "value", "Montenegro"),
                Map.of("id", "MS", "value", "Montserrat"),
                Map.of("id", "MA", "value", "Moroccan"),
                Map.of("id", "LS", "value", "Mosotho"),
                Map.of("id", "BW", "value", "Motswana"),
                Map.of("id", "MZ", "value", "Mozambican"),
                Map.of("id", "NA", "value", "Namibian"),
                Map.of("id", "NR", "value", "Nauruan"),
                Map.of("id", "NP", "value", "Nepalese"),
                Map.of("id", "NC", "value", "New Caledonia"),
                Map.of("id", "NZ", "value", "New Zealander"),
                Map.of("id", "VU", "value", "Ni-Vanuatu"),
                Map.of("id", "NI", "value", "Nicaraguan"),
                Map.of("id", "NG", "value", "Nigerian"),
                Map.of("id", "NE", "value", "Nigerien"),
                Map.of("id", "NU", "value", "Niue"),
                Map.of("id", "NF", "value", "Norfolk island"),
                Map.of("id", "KP", "value", "North Korean"),
                Map.of("id", "MP", "value", "Northern Mariana Islands"),
                Map.of("id", "NO", "value", "Norwegian"),
                Map.of("id", "OM", "value", "Omani"),
                Map.of("id", "PK", "value", "Pakistani"),
                Map.of("id", "PW", "value", "Palauan"),
                Map.of("id", "PS", "value", "Palestinian territories"),
                Map.of("id", "PA", "value", "Panamanian"),
                Map.of("id", "PG", "value", "Papua New Guinean"),
                Map.of("id", "PY", "value", "Paraguayan"),
                Map.of("id", "PE", "value", "Peruvian"),
                Map.of("id", "PN", "value", "Pitcairn"),
                Map.of("id", "PL", "value", "Polish"),
                Map.of("id", "PT", "value", "Portuguese"),
                Map.of("id", "QA", "value", "Qatar"),
                Map.of("id", "PR", "value", "Qatari"),
                Map.of("id", "UM", "value", "Remaining pacific islands of USA"),
                Map.of("id", "RO", "value", "Romanian"),
                Map.of("id", "RU", "value", "Russian"),
                Map.of("id", "RW", "value", "Rwandan"),
                Map.of("id", "RE", "value", "Réunion"),
                Map.of("id", "BL", "value", "Saint Barthélemy"),
                Map.of("id", "LC", "value", "Saint Lucian"),
                Map.of("id", "MF", "value", "Saint Martin"),
                Map.of("id", "PM", "value", "Saint Pierre and Miquelon"),
                Map.of("id", "VC", "value", "Saint Vincent and the Grenadines"),
                Map.of("id", "SV", "value", "Salvadoran"),
                Map.of("id", "SM", "value", "Sammarinese"),
                Map.of("id", "WS", "value", "Samoan"),
                Map.of("id", "ST", "value", "Sao Tomean"),
                Map.of("id", "SA", "value", "Saudi Arabian"),
                Map.of("id", "SN", "value", "Senegalese"),
                Map.of("id", "RS", "value", "Serbian"),
                Map.of("id", "SC", "value", "Seychellois"),
                Map.of("id", "SL", "value", "Sierra Leonean"),
                Map.of("id", "SG", "value", "Singaporean"),
                Map.of("id", "SX", "value", "Sint Maarten (NL)"),
                Map.of("id", "SK", "value", "Slovakian"),
                Map.of("id", "SI", "value", "Slovenian"),
                Map.of("id", "SB", "value", "Solomon Islander"),
                Map.of("id", "SO", "value", "Somali"),
                Map.of("id", "ZA", "value", "South African"),
                Map.of("id", "KR", "value", "South Korean"),
                Map.of("id", "SS", "value", "South Sudan"),
                Map.of("id", "GS", "value", "South-Georgia"),
                Map.of("id", "ES", "value", "Spanish"),
                Map.of("id", "LK", "value", "Sri Lankan"),
                Map.of("id", "SH", "value", "St. Helena"),
                Map.of("id", "SD", "value", "Sudanese"),
                Map.of("id", "SR", "value", "Surinamer"),
                Map.of("id", "SZ", "value", "Swazi"),
                Map.of("id", "SE", "value", "Swedish"),
                Map.of("id", "CH", "value", "Swiss"),
                Map.of("id", "SY", "value", "Syrian"),
                Map.of("id", "TJ", "value", "Tadzhik"),
                Map.of("id", "TW", "value", "Taiwanese"),
                Map.of("id", "TZ", "value", "Tanzanian"),
                Map.of("id", "TH", "value", "Thai"),
                Map.of("id", "TL", "value", "Timor-Leste"),
                Map.of("id", "TG", "value", "Togolese"),
                Map.of("id", "TK", "value", "Tokelau"),
                Map.of("id", "TO", "value", "Tongan"),
                Map.of("id", "TT", "value", "Trinidadian"),
                Map.of("id", "TN", "value", "Tunisian"),
                Map.of("id", "TR", "value", "Turkish"),
                Map.of("id", "TM", "value", "Turkmen"),
                Map.of("id", "TC", "value", "Turks and Caicos Islands"),
                Map.of("id", "TV", "value", "Tuvaluan"),
                Map.of("id", "UG", "value", "Ugandan"),
                Map.of("id", "UA", "value", "Ukrainian"),
                Map.of("id", "VI", "value", "United States Virgin Islands"),
                Map.of("id", "UY", "value", "Uruguayan"),
                Map.of("id", "UZ", "value", "Uzbekistani"),
                Map.of("id", "VE", "value", "Venezuelan"),
                Map.of("id", "VN", "value", "Vietnamese"),
                Map.of("id", "WF", "value", "Wallis and Futuna"),
                Map.of("id", "EH", "value", "Western Sahara"),
                Map.of("id", "YE", "value", "Yemenite"),
                Map.of("id", "ZM", "value", "Zambian"),
                Map.of("id", "ZW", "value", "Zimbabwean")
        );
    }

    public List<Map<String, Object>> getGenders() {
        return Arrays.asList(
                Map.of("id", "DIVERS", "value", "Divers"),
                Map.of("id", "FEMALE", "value", "Female"),
                Map.of("id", "INTER", "value", "Inter"),
                Map.of("id", "MALE", "value", "Male"),
                Map.of("id", "UNDEFINED", "value", "N/A"),
                Map.of("id", "OPEN", "value", "Open")
        );
    }

    public List<Map<String, Object>> getGuestTravelDocuments() {
        return Arrays.asList(
                Map.of("id", 164, "value", "Driver's licence"),
                Map.of("id", 163, "value", "Identity card"),
                Map.of("id", 161, "value", "Other"),
                Map.of("id", 162, "value", "Passport")
        );
    }

    public List<Map<String, Object>> getCommunicationMethods() {
        return Arrays.asList(
                Map.of("id", 147, "value", "E-Mail"),
                Map.of("id", 160, "value", "Mobile"),
                Map.of("id", 143, "value", "Phone"),
                Map.of("id", 149, "value", "Skype")
        );
    }

    public List<Map<String, Object>> getBookableObjects() {
        return Arrays.asList(
                Map.of("id", 119, "value", "001"),
                Map.of("id", 120, "value", "002"),
                Map.of("id", 121, "value", "003"),
                Map.of("id", 122, "value", "004"),
                Map.of("id", 123, "value", "005"),
                Map.of("id", 124, "value", "006"),
                Map.of("id", 125, "value", "007"),
                Map.of("id", 126, "value", "008"),
                Map.of("id", 127, "value", "009"),
                Map.of("id", 128, "value", "010")
        );
    }
}
