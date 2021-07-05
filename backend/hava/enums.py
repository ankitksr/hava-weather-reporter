# Common enum classes


class City:
    """
    Mapped from: http://bulk.openweathermap.org/sample/city.kist.json.gz
    """

    BENGALURU = "BLR"
    MUMBAI = "MMB"
    NEW_YORK = "NY"
    DUBAI = "DB"
    LONDON = "LND"
    MEXICO_CITY = "MXCT"

    MAX_LENGTH = 5
    CHOICES = [
        (BENGALURU, "Bengaluru"),
        (MUMBAI, "Mumbai"),
        (NEW_YORK, "New York"),
        (DUBAI, "Dubai"),
        (LONDON, "London"),
        (MEXICO_CITY, "Mexico City"),
    ]
    OPENWEATHER_ID_MAP = {
        BENGALURU: 1277333,
        MUMBAI: 1275339,
        NEW_YORK: 5128638,
        DUBAI: 292223,
        LONDON: 2643743,
        MEXICO_CITY: 3530597,
    }
    COORD_MAP = {
        BENGALURU: {"lon": 77.603287, "lat": 12.97623},
        MUMBAI: {"lon": 72.847939, "lat": 19.01441},
        NEW_YORK: {"lon": -75.499901, "lat": 43.000351},
        DUBAI: {"lon": 55.304722, "lat": 25.258169},
        LONDON: {"lon": -0.12574, "lat": 51.50853},
        MEXICO_CITY: {"lon": -99.127663, "lat": 19.428471},
    }
