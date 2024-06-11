import { Controller, Get } from '@nestjs/common'
import { IBookableObject } from 'src/shared/interfaces/IBookableObject'
import { ICommunicationMethod } from 'src/shared/interfaces/ICommunicationMethod'
import { ICountry } from 'src/shared/interfaces/ICountry'
import { IFeature } from 'src/shared/interfaces/IFeature'
import { IGender } from 'src/shared/interfaces/IGender'
import { IGuestMarketCode } from 'src/shared/interfaces/IGuestMarketCode'
import { IGuestTravelDocument } from 'src/shared/interfaces/IGuestTravelDocument'
import { IGuestType } from 'src/shared/interfaces/IGuestType'
import { IKeyword } from 'src/shared/interfaces/IKeyword'
import { ILanguage } from 'src/shared/interfaces/ILanguage'
import { INationality } from 'src/shared/interfaces/INationality'
import { IRate } from 'src/shared/interfaces/IRate'
import { ISalutation } from 'src/shared/interfaces/ISalutation'

@Controller('v1/dropdowns')
export class DropdownsController {
  @Get('guest-types')
  guestTypes(): IGuestType[] {
    return [
      {
        id: 2,
        value: 'Company',
      },
      {
        id: 3,
        value: 'Group',
      },
      {
        id: 1,
        value: 'Private',
      },
      {
        id: 5,
        value: 'Source',
      },
      {
        id: 4,
        value: 'Travel Agency',
      },
    ]
  }

  @Get('guest-market-codes')
  guestMarketCodes(): IGuestMarketCode[] {
    return [
      {
        id: 151,
        value: 'WBE Login',
      },
    ]
  }

  @Get('salutations')
  salutations(): ISalutation[] {
    return [
      {
        id: 13,
        value: 'CO',
      },
      {
        id: 15,
        value: 'Dr.',
      },
      {
        id: 73,
        value: 'Family',
      },
      {
        id: 11,
        value: 'Mr.',
      },
      {
        id: 10,
        value: 'Mrs.',
      },
      {
        id: 12,
        value: 'Prof.',
      },
    ]
  }

  @Get('languages')
  languages(): ILanguage[] {
    return [
      {
        id: 'af_ZA',
        value: 'Afrikaans',
      },
      {
        id: 'sq_AL',
        value: 'Albanian',
      },
      {
        id: 'ar_SA',
        value: 'Arabic',
      },
      {
        id: 'ar_EG',
        value: 'Arabic (Egypt)',
      },
      {
        id: 'hy_AM',
        value: 'Armenian',
      },
      {
        id: 'az_AZ',
        value: 'Azeri',
      },
      {
        id: 'be_BY',
        value: 'Belarusian',
      },
      {
        id: 'en_GB',
        value: 'British English',
      },
      {
        id: 'bg_BG',
        value: 'Bulgarian',
      },
      {
        id: 'en_CA',
        value: 'Canadian English',
      },
      {
        id: 'fr_CA',
        value: 'Canadian French',
      },
      {
        id: 'ca_ES',
        value: 'Catalan',
      },
      {
        id: 'zh_CN',
        value: 'Chinese (Simplified)',
      },
      {
        id: 'zh_TW',
        value: 'Chinese (Traditional)',
      },
      {
        id: 'hr_HR',
        value: 'Croatian',
      },
      {
        id: 'cs_CZ',
        value: 'Czech',
      },
      {
        id: 'da_DK',
        value: 'Danish',
      },
      {
        id: 'nl_NL',
        value: 'Dutch',
      },
      {
        id: 'en_US',
        value: 'English',
      },
      {
        id: 'et_EE',
        value: 'Estonian',
      },
      {
        id: 'fo_FO',
        value: 'Faroese',
      },
      {
        id: 'fa_IR',
        value: 'Farsi',
      },
      {
        id: 'fi_FI',
        value: 'Finnish',
      },
      {
        id: 'fr_FR',
        value: 'French',
      },
      {
        id: 'gl_ES',
        value: 'Galician',
      },
      {
        id: 'ka_GE',
        value: 'Georgian',
      },
      {
        id: 'de_DE',
        value: 'German',
      },
      {
        id: 'el_GR',
        value: 'Greek',
      },
      {
        id: 'gu_IN',
        value: 'Gujarati',
      },
      {
        id: 'he_IL',
        value: 'Hebrew',
      },
      {
        id: 'hi_IN',
        value: 'Hindi',
      },
      {
        id: 'hu_HU',
        value: 'Hungarian',
      },
      {
        id: 'is_IS',
        value: 'Icelandic',
      },
      {
        id: 'id_ID',
        value: 'Indonesian',
      },
      {
        id: 'it_IT',
        value: 'Italian',
      },
      {
        id: 'ja_JP',
        value: 'Japanese',
      },
      {
        id: 'kn_IN',
        value: 'Kannada',
      },
      {
        id: 'kk_KZ',
        value: 'Kazakh',
      },
      {
        id: 'ko_KR',
        value: 'Korean',
      },
      {
        id: 'ky_KG',
        value: 'Kyrgyz',
      },
      {
        id: 'lv_LV',
        value: 'Latvian',
      },
      {
        id: 'lt_LT',
        value: 'Lithuanian',
      },
      {
        id: 'mk_MK',
        value: 'Macedonian',
      },
      {
        id: 'ms_MY',
        value: 'Malay',
      },
      {
        id: 'mr_IN',
        value: 'Marathi',
      },
      {
        id: 'mn_MN',
        value: 'Mongolian',
      },
      {
        id: 'nn_NO',
        value: 'Norwegian',
      },
      {
        id: 'pl_PL',
        value: 'Polish',
      },
      {
        id: 'pt_PT',
        value: 'Portuguese',
      },
      {
        id: 'pa_IN',
        value: 'Punjabi',
      },
      {
        id: 'ro_RO',
        value: 'Romanian',
      },
      {
        id: 'ru_RU',
        value: 'Russian',
      },
      {
        id: 'sa_IN',
        value: 'Sanskrit',
      },
      {
        id: 'sr_SP',
        value: 'Serbian',
      },
      {
        id: 'sk_SK',
        value: 'Slovak',
      },
      {
        id: 'sl_SI',
        value: 'Slovenian',
      },
      {
        id: 'es_ES',
        value: 'Spanish',
      },
      {
        id: 'sw_KE',
        value: 'Swahili',
      },
      {
        id: 'sv_SE',
        value: 'Swedish',
      },
      {
        id: 'ta_IN',
        value: 'Tamil',
      },
      {
        id: 'tt_RU',
        value: 'Tatar',
      },
      {
        id: 'te_IN',
        value: 'Telugu',
      },
      {
        id: 'th_TH',
        value: 'Thai',
      },
      {
        id: 'tr_TR',
        value: 'Turkish',
      },
      {
        id: 'uk_UA',
        value: 'Ukrainian',
      },
      {
        id: 'ur_PK',
        value: 'Urdu',
      },
      {
        id: 'uz_UZ',
        value: 'Uzbek',
      },
      {
        id: 'vi_VN',
        value: 'Vietnamese',
      },
    ]
  }

  @Get('keywords')
  keywords(): IKeyword[] {
    return [
      {
        id: 155,
        value: 'Business',
      },
      {
        id: 157,
        value: 'Golfer',
      },
      {
        id: 159,
        value: 'Prospektanfrage',
      },
    ]
  }

  @Get('features')
  features(): IFeature[] {
    return [
      {
        id: 1,
        value: 'King Bed',
      },
      {
        id: 2,
        value: 'Twin Bed',
      },
    ]
  }

  @Get('rates')
  rates(): IRate[] {
    return [
      {
        id: 1,
        value: 'Rack BB',
        isDefault: true,
        confidential: false,
      },
      {
        id: 2,
        value: 'STO 10%',
        isDefault: false,
        confidential: false,
      },
    ]
  }

  @Get('countries')
  countries(): ICountry[] {
    return [
      {
        id: 'AX',
        value: 'Aaland Islands',
      },
      {
        id: 'AF',
        value: 'Afghanistan',
      },
      {
        id: 'AL',
        value: 'Albania',
      },
      {
        id: 'DZ',
        value: 'Algeria',
      },
      {
        id: 'AS',
        value: 'American Samoa',
      },
      {
        id: 'AD',
        value: 'Andorra',
      },
      {
        id: 'AO',
        value: 'Angola',
      },
      {
        id: 'AI',
        value: 'Anguilla',
      },
      {
        id: 'AQ',
        value: 'Antarctic',
      },
      {
        id: 'AG',
        value: 'Antigua and Barbuda',
      },
      {
        id: 'AR',
        value: 'Argentina',
      },
      {
        id: 'AM',
        value: 'Armenia',
      },
      {
        id: 'AW',
        value: 'Aruba',
      },
      {
        id: 'AU',
        value: 'Australia',
      },
      {
        id: 'AT',
        value: 'Austria',
      },
      {
        id: 'AZ',
        value: 'Azerbaijan',
      },
      {
        id: 'BS',
        value: 'Bahamas',
      },
      {
        id: 'BH',
        value: 'Bahrain',
      },
      {
        id: 'BD',
        value: 'Bangladesh',
      },
      {
        id: 'BB',
        value: 'Barbados',
      },
      {
        id: 'BY',
        value: 'Belarus',
      },
      {
        id: 'BE',
        value: 'Belgium',
      },
      {
        id: 'BZ',
        value: 'Belize',
      },
      {
        id: 'BJ',
        value: 'Benin',
      },
      {
        id: 'BM',
        value: 'Bermuda',
      },
      {
        id: 'BT',
        value: 'Bhutan',
      },
      {
        id: 'BO',
        value: 'Bolivia',
      },
      {
        id: 'BQ',
        value: 'Bonaire',
      },
      {
        id: 'BA',
        value: 'Bosnia and Herzegovina',
      },
      {
        id: 'BW',
        value: 'Botswana',
      },
      {
        id: 'BV',
        value: 'Bouvet Island',
      },
      {
        id: 'BR',
        value: 'Brazil',
      },
      {
        id: 'IO',
        value: 'British Indian Ocean Territory',
      },
      {
        id: 'VG',
        value: 'British Virgin Islands',
      },
      {
        id: 'BN',
        value: 'Brunei Darussalam',
      },
      {
        id: 'BG',
        value: 'Bulgaria',
      },
      {
        id: 'BF',
        value: 'Burkina Faso',
      },
      {
        id: 'BI',
        value: 'Burundi',
      },
      {
        id: 'KH',
        value: 'Cambodia',
      },
      {
        id: 'CM',
        value: 'Cameroon',
      },
      {
        id: 'CA',
        value: 'Canada',
      },
      {
        id: 'CV',
        value: 'Cape Verde',
      },
      {
        id: 'AN',
        value: 'Caribbean Netherlands',
      },
      {
        id: 'KY',
        value: 'Cayman islands',
      },
      {
        id: 'CF',
        value: 'Central African Republic',
      },
      {
        id: 'TD',
        value: 'Chad',
      },
      {
        id: 'CL',
        value: 'Chile',
      },
      {
        id: 'CN',
        value: 'China',
      },
      {
        id: 'CX',
        value: 'Christmas Island',
      },
      {
        id: 'CC',
        value: 'Cocos Islands',
      },
      {
        id: 'CO',
        value: 'Colombia',
      },
      {
        id: 'KM',
        value: 'Comoros',
      },
      {
        id: 'CD',
        value: 'Congo, Democratic',
      },
      {
        id: 'CG',
        value: 'Congo, Republic',
      },
      {
        id: 'CK',
        value: 'Cook Islands',
      },
      {
        id: 'CR',
        value: 'Costa Rica',
      },
      {
        id: 'CI',
        value: 'Cote dIvoire',
      },
      {
        id: 'HR',
        value: 'Croatia',
      },
      {
        id: 'CU',
        value: 'Cuba',
      },
      {
        id: 'CW',
        value: 'Curacao',
      },
      {
        id: 'CY',
        value: 'Cyprus',
      },
      {
        id: 'CZ',
        value: 'Czech Republic',
      },
      {
        id: 'DK',
        value: 'Denmark',
      },
      {
        id: 'DJ',
        value: 'Djibouti',
      },
      {
        id: 'DM',
        value: 'Dominica',
      },
      {
        id: 'DO',
        value: 'Dominican Republic',
      },
      {
        id: 'EC',
        value: 'Ecuador',
      },
      {
        id: 'EG',
        value: 'Egypt',
      },
      {
        id: 'SV',
        value: 'El Salvador',
      },
      {
        id: 'GQ',
        value: 'Equatorial Guinea',
      },
      {
        id: 'ER',
        value: 'Eritrea',
      },
      {
        id: 'EE',
        value: 'Estonia',
      },
      {
        id: 'ET',
        value: 'Ethiopia',
      },
      {
        id: 'FK',
        value: 'Falkland Islands',
      },
      {
        id: 'FO',
        value: 'Faroe Islands',
      },
      {
        id: 'FJ',
        value: 'Fiji',
      },
      {
        id: 'FI',
        value: 'Finland',
      },
      {
        id: 'FR',
        value: 'France',
      },
      {
        id: 'SJ',
        value: 'Franz Joseph Land',
      },
      {
        id: 'GF',
        value: 'French Guiana',
      },
      {
        id: 'PF',
        value: 'French Polynesia',
      },
      {
        id: 'TF',
        value: 'French Southern and Antarctic Lands',
      },
      {
        id: 'GA',
        value: 'Gabon',
      },
      {
        id: 'GM',
        value: 'Gambia',
      },
      {
        id: 'GE',
        value: 'Georgia',
      },
      {
        id: 'DE',
        value: 'Germany',
      },
      {
        id: 'GH',
        value: 'Ghana',
      },
      {
        id: 'GI',
        value: 'Gibraltar',
      },
      {
        id: 'GR',
        value: 'Greece',
      },
      {
        id: 'GL',
        value: 'Greenland',
      },
      {
        id: 'GD',
        value: 'Grenada',
      },
      {
        id: 'GP',
        value: 'Guadeloupe',
      },
      {
        id: 'GU',
        value: 'Guam',
      },
      {
        id: 'GT',
        value: 'Guatemala',
      },
      {
        id: 'GG',
        value: 'Guernsey',
      },
      {
        id: 'GN',
        value: 'Guinea',
      },
      {
        id: 'GW',
        value: 'Guinea-Bissau',
      },
      {
        id: 'GY',
        value: 'Guyana',
      },
      {
        id: 'HT',
        value: 'Haiti',
      },
      {
        id: 'HM',
        value: 'Heard Island and McDonald Islands',
      },
      {
        id: 'VA',
        value: 'Holy See Vatican City State',
      },
      {
        id: 'HN',
        value: 'Honduras',
      },
      {
        id: 'HK',
        value: 'Hongkong',
      },
      {
        id: 'HU',
        value: 'Hungary',
      },
      {
        id: 'IS',
        value: 'Iceland',
      },
      {
        id: 'IN',
        value: 'India',
      },
      {
        id: 'ID',
        value: 'Indonesia',
      },
      {
        id: 'IR',
        value: 'Iran',
      },
      {
        id: 'IQ',
        value: 'Iraq',
      },
      {
        id: 'IE',
        value: 'Ireland',
      },
      {
        id: 'IM',
        value: 'Isle of Man',
      },
      {
        id: 'IL',
        value: 'Israel',
      },
      {
        id: 'IT',
        value: 'Italy',
      },
      {
        id: 'JM',
        value: 'Jamaica',
      },
      {
        id: 'JP',
        value: 'Japan',
      },
      {
        id: 'JE',
        value: 'Jersey',
      },
      {
        id: 'JO',
        value: 'Jordan',
      },
      {
        id: 'KZ',
        value: 'Kazakhstan',
      },
      {
        id: 'KE',
        value: 'Kenya',
      },
      {
        id: 'KI',
        value: 'Kiribati',
      },
      {
        id: 'KP',
        value: 'Korea North',
      },
      {
        id: 'KR',
        value: 'Korea South',
      },
      {
        id: 'KW',
        value: 'Kuwait',
      },
      {
        id: 'KG',
        value: 'Kyrgyz Republic',
      },
      {
        id: 'LA',
        value: 'Lao Peoples Democratic Republic',
      },
      {
        id: 'LV',
        value: 'Latvia',
      },
      {
        id: 'LB',
        value: 'Lebanon',
      },
      {
        id: 'LS',
        value: 'Lesotho',
      },
      {
        id: 'LR',
        value: 'Liberia',
      },
      {
        id: 'LY',
        value: 'Libyan Arab Jamahiriya',
      },
      {
        id: 'LI',
        value: 'Liechtenstein',
      },
      {
        id: 'LT',
        value: 'Lithuania',
      },
      {
        id: 'LU',
        value: 'Luxembourg',
      },
      {
        id: 'MO',
        value: 'Macao',
      },
      {
        id: 'MK',
        value: 'Macedonia',
      },
      {
        id: 'MG',
        value: 'Madagascar',
      },
      {
        id: 'MW',
        value: 'Malawi',
      },
      {
        id: 'MY',
        value: 'Malaysia',
      },
      {
        id: 'MV',
        value: 'Maldives',
      },
      {
        id: 'ML',
        value: 'Mali',
      },
      {
        id: 'MT',
        value: 'Malta',
      },
      {
        id: 'MH',
        value: 'Marshall Islands',
      },
      {
        id: 'MQ',
        value: 'Martinique',
      },
      {
        id: 'MR',
        value: 'Mauritania',
      },
      {
        id: 'MU',
        value: 'Mauritius',
      },
      {
        id: 'YT',
        value: 'Mayotte',
      },
      {
        id: 'MX',
        value: 'Mexico',
      },
      {
        id: 'FM',
        value: 'Micronesia',
      },
      {
        id: 'MD',
        value: 'Moldova',
      },
      {
        id: 'MC',
        value: 'Monaco',
      },
      {
        id: 'MN',
        value: 'Mongolia',
      },
      {
        id: 'ME',
        value: 'Montenegro',
      },
      {
        id: 'MS',
        value: 'Montserrat',
      },
      {
        id: 'MA',
        value: 'Morocco',
      },
      {
        id: 'MZ',
        value: 'Mozambique',
      },
      {
        id: 'MM',
        value: 'Myanmar',
      },
      {
        id: 'NA',
        value: 'Namibia',
      },
      {
        id: 'NR',
        value: 'Nauru',
      },
      {
        id: 'NP',
        value: 'Nepal',
      },
      {
        id: 'NL',
        value: 'Netherlands',
      },
      {
        id: 'NC',
        value: 'New Caledonia',
      },
      {
        id: 'NZ',
        value: 'New Zealand',
      },
      {
        id: 'NI',
        value: 'Nicaragua',
      },
      {
        id: 'NE',
        value: 'Niger',
      },
      {
        id: 'NG',
        value: 'Nigeria',
      },
      {
        id: 'NU',
        value: 'Niue',
      },
      {
        id: 'NF',
        value: 'Norfolk island',
      },
      {
        id: 'MP',
        value: 'Northern Mariana Islands',
      },
      {
        id: 'NO',
        value: 'Norway',
      },
      {
        id: 'OM',
        value: 'Oman',
      },
      {
        id: 'PK',
        value: 'Pakistan',
      },
      {
        id: 'PW',
        value: 'Palau',
      },
      {
        id: 'PS',
        value: 'Palestinian territories',
      },
      {
        id: 'PA',
        value: 'Panama',
      },
      {
        id: 'PG',
        value: 'Papua New Guinea',
      },
      {
        id: 'PY',
        value: 'Paraguay',
      },
      {
        id: 'PE',
        value: 'Peru',
      },
      {
        id: 'PH',
        value: 'Philippines',
      },
      {
        id: 'PN',
        value: 'Pitcairn',
      },
      {
        id: 'PL',
        value: 'Poland',
      },
      {
        id: 'PT',
        value: 'Portugal',
      },
      {
        id: 'PR',
        value: 'Puerto Rico',
      },
      {
        id: 'QA',
        value: 'Qatar',
      },
      {
        id: 'UM',
        value: 'Remaining pacific islands of USA',
      },
      {
        id: 'XK',
        value: 'Republic of Kosovo',
      },
      {
        id: 'RO',
        value: 'Romania',
      },
      {
        id: 'RU',
        value: 'Russian Federation',
      },
      {
        id: 'RW',
        value: 'Rwanda',
      },
      {
        id: 'RE',
        value: 'Réunion',
      },
      {
        id: 'BL',
        value: 'Saint Barthelemy',
      },
      {
        id: 'KN',
        value: 'Saint Kitts and Nevis',
      },
      {
        id: 'LC',
        value: 'Saint Lucia',
      },
      {
        id: 'MF',
        value: 'Saint Martin',
      },
      {
        id: 'PM',
        value: 'Saint Pierre and Miquelon',
      },
      {
        id: 'VC',
        value: 'Saint Vincent and the Grenadines',
      },
      {
        id: 'WS',
        value: 'Samoa',
      },
      {
        id: 'SM',
        value: 'San Marino',
      },
      {
        id: 'ST',
        value: 'Sao Tome and Principe',
      },
      {
        id: 'SA',
        value: 'Saudi Arabia',
      },
      {
        id: 'SN',
        value: 'Senegal',
      },
      {
        id: 'RS',
        value: 'Serbia',
      },
      {
        id: 'SC',
        value: 'Seychelles',
      },
      {
        id: 'SL',
        value: 'Sierra Leone',
      },
      {
        id: 'SG',
        value: 'Singapore',
      },
      {
        id: 'SX',
        value: 'Sint Maarten (NL)',
      },
      {
        id: 'SK',
        value: 'Slovakia',
      },
      {
        id: 'SI',
        value: 'Slovenia',
      },
      {
        id: 'SB',
        value: 'Solomon Islands',
      },
      {
        id: 'SO',
        value: 'Somalia',
      },
      {
        id: 'ZA',
        value: 'South Africa',
      },
      {
        id: 'SS',
        value: 'South Sudan',
      },
      {
        id: 'GS',
        value: 'South-Georgia',
      },
      {
        id: 'ES',
        value: 'Spain',
      },
      {
        id: 'LK',
        value: 'Sri Lanka',
      },
      {
        id: 'SH',
        value: 'St. Helena',
      },
      {
        id: 'SD',
        value: 'Sudan',
      },
      {
        id: 'SR',
        value: 'Suriname',
      },
      {
        id: 'SZ',
        value: 'Swaziland',
      },
      {
        id: 'SE',
        value: 'Sweden',
      },
      {
        id: 'CH',
        value: 'Switzerland',
      },
      {
        id: 'SY',
        value: 'Syrian',
      },
      {
        id: 'TW',
        value: 'Taiwan',
      },
      {
        id: 'TJ',
        value: 'Tajikistan',
      },
      {
        id: 'TZ',
        value: 'Tanzania',
      },
      {
        id: 'TH',
        value: 'Thailand',
      },
      {
        id: 'TL',
        value: 'Timor-Leste',
      },
      {
        id: 'TG',
        value: 'Togo',
      },
      {
        id: 'TK',
        value: 'Tokelau',
      },
      {
        id: 'TO',
        value: 'Tonga',
      },
      {
        id: 'TT',
        value: 'Trinidad and Tobago',
      },
      {
        id: 'TN',
        value: 'Tunisia',
      },
      {
        id: 'TR',
        value: 'Turkey',
      },
      {
        id: 'TM',
        value: 'Turkmenistan',
      },
      {
        id: 'TC',
        value: 'Turks and Caicos Islands',
      },
      {
        id: 'TV',
        value: 'Tuvalu',
      },
      {
        id: 'UG',
        value: 'Uganda',
      },
      {
        id: 'UA',
        value: 'Ukraine',
      },
      {
        id: 'AE',
        value: 'United Arab Emirates',
      },
      {
        id: 'GB',
        value: 'United Kingdom',
      },
      {
        id: 'US',
        value: 'United States of America',
      },
      {
        id: 'VI',
        value: 'United States Virgin Islands',
      },
      {
        id: 'UY',
        value: 'Uruguay',
      },
      {
        id: 'UZ',
        value: 'Uzbekistan',
      },
      {
        id: 'VU',
        value: 'Vanuatu',
      },
      {
        id: 'VE',
        value: 'Venezuela',
      },
      {
        id: 'VN',
        value: 'Vietnam',
      },
      {
        id: 'WF',
        value: 'Wallis and Futuna',
      },
      {
        id: 'EH',
        value: 'Western Sahara',
      },
      {
        id: 'YE',
        value: 'Yemen',
      },
      {
        id: 'ZM',
        value: 'Zambia',
      },
      {
        id: 'ZW',
        value: 'Zimbabwe',
      },
    ]
  }

  @Get('nationalities')
  nationalities(): INationality[] {
    return [
      {
        id: 'AX',
        value: 'Aaland Islands',
      },
      {
        id: 'AF',
        value: 'Afghan',
      },
      {
        id: 'AL',
        value: 'Albanian',
      },
      {
        id: 'DZ',
        value: 'Algerian',
      },
      {
        id: 'US',
        value: 'American',
      },
      {
        id: 'AS',
        value: 'American Samoa',
      },
      {
        id: 'AD',
        value: 'Andorran',
      },
      {
        id: 'AO',
        value: 'Angolan',
      },
      {
        id: 'AI',
        value: 'Anguilla',
      },
      {
        id: 'AQ',
        value: 'Antarctic',
      },
      {
        id: 'AG',
        value: 'Antiguans, Barbudans',
      },
      {
        id: 'AR',
        value: 'Argentinean',
      },
      {
        id: 'AM',
        value: 'Armenian',
      },
      {
        id: 'AW',
        value: 'Aruba',
      },
      {
        id: 'AU',
        value: 'Australian',
      },
      {
        id: 'AT',
        value: 'Austrian',
      },
      {
        id: 'AZ',
        value: 'Azerbaijani',
      },
      {
        id: 'BS',
        value: 'Bahamian',
      },
      {
        id: 'BH',
        value: 'Bahraini',
      },
      {
        id: 'BD',
        value: 'Bangladeshi',
      },
      {
        id: 'BB',
        value: 'Barbadian',
      },
      {
        id: 'BY',
        value: 'Belarusian',
      },
      {
        id: 'BE',
        value: 'Belgian',
      },
      {
        id: 'BZ',
        value: 'Belizean',
      },
      {
        id: 'BJ',
        value: 'Beninese',
      },
      {
        id: 'BM',
        value: 'Bermuda',
      },
      {
        id: 'BT',
        value: 'Bhutanese',
      },
      {
        id: 'BO',
        value: 'Bolivian',
      },
      {
        id: 'BQ',
        value: 'Bonaire',
      },
      {
        id: 'BA',
        value: 'Bosnian, Herzegovinian',
      },
      {
        id: 'BV',
        value: 'Bouvet Island',
      },
      {
        id: 'BR',
        value: 'Brazilian',
      },
      {
        id: 'GB',
        value: 'British',
      },
      {
        id: 'IO',
        value: 'British Indian Ocean Territory',
      },
      {
        id: 'VG',
        value: 'British Virgin Islands',
      },
      {
        id: 'BN',
        value: 'Bruneian',
      },
      {
        id: 'BG',
        value: 'Bulgarian',
      },
      {
        id: 'BF',
        value: 'Burkinabe',
      },
      {
        id: 'MM',
        value: 'Burmese',
      },
      {
        id: 'BI',
        value: 'Burundian',
      },
      {
        id: 'KH',
        value: 'Cambodian',
      },
      {
        id: 'CM',
        value: 'Cameroonian',
      },
      {
        id: 'CA',
        value: 'Canadian',
      },
      {
        id: 'CV',
        value: 'Cape Verdian',
      },
      {
        id: 'KY',
        value: 'Cayman islands',
      },
      {
        id: 'CF',
        value: 'Central African',
      },
      {
        id: 'TD',
        value: 'Chadian',
      },
      {
        id: 'CL',
        value: 'Chilean',
      },
      {
        id: 'CN',
        value: 'Chinese',
      },
      {
        id: 'VA',
        value: 'Christ',
      },
      {
        id: 'CX',
        value: 'Christmas Island',
      },
      {
        id: 'CC',
        value: 'Cocos Islands',
      },
      {
        id: 'CO',
        value: 'Colombian',
      },
      {
        id: 'KM',
        value: 'Comoran',
      },
      {
        id: 'CD',
        value: 'Congolese (CD)',
      },
      {
        id: 'CG',
        value: 'Congolese (CG)',
      },
      {
        id: 'CK',
        value: 'Cook Islands',
      },
      {
        id: 'CR',
        value: 'Costa Rican',
      },
      {
        id: 'HR',
        value: 'Croatian',
      },
      {
        id: 'CU',
        value: 'Cuban',
      },
      {
        id: 'CW',
        value: 'Curacao',
      },
      {
        id: 'CY',
        value: 'Cypriot',
      },
      {
        id: 'CZ',
        value: 'Czech',
      },
      {
        id: 'DK',
        value: 'Danish',
      },
      {
        id: 'DJ',
        value: 'Djibouti',
      },
      {
        id: 'DM',
        value: 'Dominican (DM)',
      },
      {
        id: 'DO',
        value: 'Dominican (DO)',
      },
      {
        id: 'NL',
        value: 'Dutch',
      },
      {
        id: 'AN',
        value: 'Dutch Caribean',
      },
      {
        id: 'EC',
        value: 'Ecuadorean',
      },
      {
        id: 'EG',
        value: 'Egyptian',
      },
      {
        id: 'AE',
        value: 'Emirian',
      },
      {
        id: 'GQ',
        value: 'Equatorial Guinean',
      },
      {
        id: 'ER',
        value: 'Eritrean',
      },
      {
        id: 'EE',
        value: 'Estonian',
      },
      {
        id: 'ET',
        value: 'Ethiopian',
      },
      {
        id: 'FK',
        value: 'Falkland Islands',
      },
      {
        id: 'FO',
        value: 'Faroe Islands',
      },
      {
        id: 'FJ',
        value: 'Fijian',
      },
      {
        id: 'PH',
        value: 'Filipino',
      },
      {
        id: 'FI',
        value: 'Finnish',
      },
      {
        id: 'SJ',
        value: 'Franz Joseph Land',
      },
      {
        id: 'FR',
        value: 'French',
      },
      {
        id: 'GF',
        value: 'French Guiana',
      },
      {
        id: 'PF',
        value: 'French Polynesia',
      },
      {
        id: 'TF',
        value: 'French Southern and Antarctic Lands',
      },
      {
        id: 'GA',
        value: 'Gabonese',
      },
      {
        id: 'GM',
        value: 'Gambian',
      },
      {
        id: 'GE',
        value: 'Georgian',
      },
      {
        id: 'DE',
        value: 'German',
      },
      {
        id: 'GH',
        value: 'Ghanaian',
      },
      {
        id: 'GI',
        value: 'Gibraltar',
      },
      {
        id: 'GR',
        value: 'Greek',
      },
      {
        id: 'GL',
        value: 'Greenland',
      },
      {
        id: 'GD',
        value: 'Grenadian',
      },
      {
        id: 'GP',
        value: 'Guadeloupe',
      },
      {
        id: 'GU',
        value: 'Guam',
      },
      {
        id: 'GT',
        value: 'Guatemalan',
      },
      {
        id: 'GG',
        value: 'Guernsey',
      },
      {
        id: 'GN',
        value: 'Guinean',
      },
      {
        id: 'GY',
        value: 'Guyana',
      },
      {
        id: 'GW',
        value: 'Guyanese',
      },
      {
        id: 'HT',
        value: 'Haitian',
      },
      {
        id: 'HM',
        value: 'Heard Island and McDonald Islands',
      },
      {
        id: 'HN',
        value: 'Honduran',
      },
      {
        id: 'HK',
        value: 'Hongkong',
      },
      {
        id: 'HU',
        value: 'Hungarian',
      },
      {
        id: 'KI',
        value: 'I-Kiribati',
      },
      {
        id: 'IS',
        value: 'Icelander',
      },
      {
        id: 'IN',
        value: 'Indian',
      },
      {
        id: 'ID',
        value: 'Indonesian',
      },
      {
        id: 'IR',
        value: 'Iranian',
      },
      {
        id: 'IQ',
        value: 'Iraqi',
      },
      {
        id: 'IE',
        value: 'Irish',
      },
      {
        id: 'IM',
        value: 'Isle of Man',
      },
      {
        id: 'IL',
        value: 'Israeli',
      },
      {
        id: 'IT',
        value: 'Italian',
      },
      {
        id: 'CI',
        value: 'Ivorian',
      },
      {
        id: 'JM',
        value: 'Jamaican',
      },
      {
        id: 'JP',
        value: 'Japanese',
      },
      {
        id: 'JE',
        value: 'Jersey',
      },
      {
        id: 'JO',
        value: 'Jordanian',
      },
      {
        id: 'KZ',
        value: 'Kazakhstani',
      },
      {
        id: 'KE',
        value: 'Kenyan',
      },
      {
        id: 'KN',
        value: 'Kittian and Nevisian',
      },
      {
        id: 'XK',
        value: 'Kosovo',
      },
      {
        id: 'KW',
        value: 'Kuwaiti',
      },
      {
        id: 'KG',
        value: 'Kyrgyz',
      },
      {
        id: 'LA',
        value: 'Laotian',
      },
      {
        id: 'LV',
        value: 'Latvian',
      },
      {
        id: 'LB',
        value: 'Lebanese',
      },
      {
        id: 'LR',
        value: 'Liberian',
      },
      {
        id: 'LY',
        value: 'Libyan',
      },
      {
        id: 'LI',
        value: 'Liechtensteiner',
      },
      {
        id: 'LT',
        value: 'Lithuanian',
      },
      {
        id: 'LU',
        value: 'Luxembourger',
      },
      {
        id: 'MO',
        value: 'Macao',
      },
      {
        id: 'MK',
        value: 'Macedonian',
      },
      {
        id: 'MG',
        value: 'Malagasy',
      },
      {
        id: 'MW',
        value: 'Malawian',
      },
      {
        id: 'MY',
        value: 'Malaysian',
      },
      {
        id: 'MV',
        value: 'Maldivian',
      },
      {
        id: 'ML',
        value: 'Malian',
      },
      {
        id: 'MT',
        value: 'Maltese',
      },
      {
        id: 'MH',
        value: 'Marshallese',
      },
      {
        id: 'MQ',
        value: 'Martinique',
      },
      {
        id: 'MR',
        value: 'Mauritanian',
      },
      {
        id: 'MU',
        value: 'Mauritian',
      },
      {
        id: 'YT',
        value: 'Mayotte',
      },
      {
        id: 'MX',
        value: 'Mexican',
      },
      {
        id: 'FM',
        value: 'Micronesian',
      },
      {
        id: 'MD',
        value: 'Moldovan',
      },
      {
        id: 'MC',
        value: 'Monegasque',
      },
      {
        id: 'MN',
        value: 'Mongolian',
      },
      {
        id: 'ME',
        value: 'Montenegro',
      },
      {
        id: 'MS',
        value: 'Montserrat',
      },
      {
        id: 'MA',
        value: 'Moroccan',
      },
      {
        id: 'LS',
        value: 'Mosotho',
      },
      {
        id: 'BW',
        value: 'Motswana',
      },
      {
        id: 'MZ',
        value: 'Mozambican',
      },
      {
        id: 'NA',
        value: 'Namibian',
      },
      {
        id: 'NR',
        value: 'Nauruan',
      },
      {
        id: 'NP',
        value: 'Nepalese',
      },
      {
        id: 'NC',
        value: 'New Caledonia',
      },
      {
        id: 'NZ',
        value: 'New Zealander',
      },
      {
        id: 'VU',
        value: 'Ni-Vanuatu',
      },
      {
        id: 'NI',
        value: 'Nicaraguan',
      },
      {
        id: 'NG',
        value: 'Nigerian',
      },
      {
        id: 'NE',
        value: 'Nigerien',
      },
      {
        id: 'NU',
        value: 'Niue',
      },
      {
        id: 'NF',
        value: 'Norfolk island',
      },
      {
        id: 'KP',
        value: 'North Korean',
      },
      {
        id: 'MP',
        value: 'Northern Mariana Islands',
      },
      {
        id: 'NO',
        value: 'Norwegian',
      },
      {
        id: 'OM',
        value: 'Omani',
      },
      {
        id: 'PK',
        value: 'Pakistani',
      },
      {
        id: 'PW',
        value: 'Palauan',
      },
      {
        id: 'PS',
        value: 'Palestinian territories',
      },
      {
        id: 'PA',
        value: 'Panamanian',
      },
      {
        id: 'PG',
        value: 'Papua New Guinean',
      },
      {
        id: 'PY',
        value: 'Paraguayan',
      },
      {
        id: 'PE',
        value: 'Peruvian',
      },
      {
        id: 'PN',
        value: 'Pitcairn',
      },
      {
        id: 'PL',
        value: 'Polish',
      },
      {
        id: 'PT',
        value: 'Portuguese',
      },
      {
        id: 'QA',
        value: 'Qatar',
      },
      {
        id: 'PR',
        value: 'Qatari',
      },
      {
        id: 'UM',
        value: 'Remaining pacific islands of USA',
      },
      {
        id: 'RO',
        value: 'Romanian',
      },
      {
        id: 'RU',
        value: 'Russian',
      },
      {
        id: 'RW',
        value: 'Rwandan',
      },
      {
        id: 'RE',
        value: 'Réunion',
      },
      {
        id: 'BL',
        value: 'Saint Barthélemy',
      },
      {
        id: 'LC',
        value: 'Saint Lucian',
      },
      {
        id: 'MF',
        value: 'Saint Martin',
      },
      {
        id: 'PM',
        value: 'Saint Pierre and Miquelon',
      },
      {
        id: 'VC',
        value: 'Saint Vincent and the Grenadines',
      },
      {
        id: 'SV',
        value: 'Salvadoran',
      },
      {
        id: 'SM',
        value: 'Sammarinese',
      },
      {
        id: 'WS',
        value: 'Samoan',
      },
      {
        id: 'ST',
        value: 'Sao Tomean',
      },
      {
        id: 'SA',
        value: 'Saudi Arabian',
      },
      {
        id: 'SN',
        value: 'Senegalese',
      },
      {
        id: 'RS',
        value: 'Serbian',
      },
      {
        id: 'SC',
        value: 'Seychellois',
      },
      {
        id: 'SL',
        value: 'Sierra Leonean',
      },
      {
        id: 'SG',
        value: 'Singaporean',
      },
      {
        id: 'SX',
        value: 'Sint Maarten (NL)',
      },
      {
        id: 'SK',
        value: 'Slovakian',
      },
      {
        id: 'SI',
        value: 'Slovenian',
      },
      {
        id: 'SB',
        value: 'Solomon Islander',
      },
      {
        id: 'SO',
        value: 'Somali',
      },
      {
        id: 'ZA',
        value: 'South African',
      },
      {
        id: 'KR',
        value: 'South Korean',
      },
      {
        id: 'SS',
        value: 'South Sudan',
      },
      {
        id: 'GS',
        value: 'South-Georgia',
      },
      {
        id: 'ES',
        value: 'Spanish',
      },
      {
        id: 'LK',
        value: 'Sri Lankan',
      },
      {
        id: 'SH',
        value: 'St. Helena',
      },
      {
        id: 'SD',
        value: 'Sudanese',
      },
      {
        id: 'SR',
        value: 'Surinamer',
      },
      {
        id: 'SZ',
        value: 'Swazi',
      },
      {
        id: 'SE',
        value: 'Swedish',
      },
      {
        id: 'CH',
        value: 'Swiss',
      },
      {
        id: 'SY',
        value: 'Syrian',
      },
      {
        id: 'TJ',
        value: 'Tadzhik',
      },
      {
        id: 'TW',
        value: 'Taiwanese',
      },
      {
        id: 'TZ',
        value: 'Tanzanian',
      },
      {
        id: 'TH',
        value: 'Thai',
      },
      {
        id: 'TL',
        value: 'Timor-Leste',
      },
      {
        id: 'TG',
        value: 'Togolese',
      },
      {
        id: 'TK',
        value: 'Tokelau',
      },
      {
        id: 'TO',
        value: 'Tongan',
      },
      {
        id: 'TT',
        value: 'Trinidadian',
      },
      {
        id: 'TN',
        value: 'Tunisian',
      },
      {
        id: 'TR',
        value: 'Turkish',
      },
      {
        id: 'TM',
        value: 'Turkmen',
      },
      {
        id: 'TC',
        value: 'Turks and Caicos Islands',
      },
      {
        id: 'TV',
        value: 'Tuvaluan',
      },
      {
        id: 'UG',
        value: 'Ugandan',
      },
      {
        id: 'UA',
        value: 'Ukrainian',
      },
      {
        id: 'VI',
        value: 'United States Virgin Islands',
      },
      {
        id: 'UY',
        value: 'Uruguayan',
      },
      {
        id: 'UZ',
        value: 'Uzbekistani',
      },
      {
        id: 'VE',
        value: 'Venezuelan',
      },
      {
        id: 'VN',
        value: 'Vietnamese',
      },
      {
        id: 'WF',
        value: 'Wallis and Futuna',
      },
      {
        id: 'EH',
        value: 'Western Sahara',
      },
      {
        id: 'YE',
        value: 'Yemenite',
      },
      {
        id: 'ZM',
        value: 'Zambian',
      },
      {
        id: 'ZW',
        value: 'Zimbabwean',
      },
    ]
  }

  @Get('genders')
  genders(): IGender[] {
    return [
      {
        id: 'DIVERS',
        value: 'Divers',
      },
      {
        id: 'FEMALE',
        value: 'Female',
      },
      {
        id: 'INTER',
        value: 'Inter',
      },
      {
        id: 'MALE',
        value: 'Male',
      },
      {
        id: 'UNDEFINED',
        value: 'N/A',
      },
      {
        id: 'OPEN',
        value: 'Open',
      },
    ]
  }

  @Get('guest-travel-documents')
  guestTravelDocuments(): IGuestTravelDocument[] {
    return [
      {
        id: 164,
        value: "Driver's licence",
      },
      {
        id: 163,
        value: 'Identity card',
      },
      {
        id: 161,
        value: 'Other',
      },
      {
        id: 162,
        value: 'Passport',
      },
    ]
  }

  @Get('communication-methods')
  communicationMethods(): ICommunicationMethod[] {
    return [
      {
        id: 147,
        value: 'E-Mail',
      },
      {
        id: 160,
        value: 'Mobile',
      },
      {
        id: 143,
        value: 'Phone',
      },
      {
        id: 149,
        value: 'Skype',
      },
    ]
  }

  @Get('bookable-objects')
  bookableObjects(): IBookableObject[] {
    return [
      {
        id: 119,
        value: '001',
      },
      {
        id: 120,
        value: '002',
      },
      {
        id: 121,
        value: '003',
      },
      {
        id: 122,
        value: '004',
      },
      {
        id: 123,
        value: '005',
      },
      {
        id: 124,
        value: '006',
      },
      {
        id: 125,
        value: '007',
      },
      {
        id: 126,
        value: '008',
      },
      {
        id: 127,
        value: '009',
      },
      {
        id: 128,
        value: '010',
      },
    ]
  }
}
