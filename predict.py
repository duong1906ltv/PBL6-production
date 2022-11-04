import pickle
import sys

import pickle
vec = pickle.load(open('/home/duong/testreadh5/finalized_countvectorizer.h5', 'rb'))
model = pickle.load(open('/home/duong/testreadh5/model.h5', 'rb'))
if model.predict(vec.transform([sys.argv[1]]))[0] == 1:
    print(1)
else:
    print(0)
