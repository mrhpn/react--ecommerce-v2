import React from 'react';
import carouselImg1 from '../assets/imgs/coca-cola.jpg';
import carouselImg2 from '../assets/imgs/elan-cover.jpg';
import carouselImg3 from '../assets/imgs/fresh-meats.jpg';
import product1 from '../assets/imgs/1.jpg';

const Home = () => {
  return (
    <div className="container">
      <div
        id="carouselExampleCaptions"
        className="carousel slide mx-auto mt-3"
        data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={carouselImg1}
              className="d-block w-100 rounded"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carouselImg2}
              className="d-block w-100 rounded"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={carouselImg3}
              className="d-block w-100 rounded"
              alt="..."
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="mt-5 mb-5">
        <div className="d-flex justify-content-between">
          <h4 className="font-weight-bold mr-auto title__category-size">
            အဓိကဟင်းချက်ပစ္စည်းများ
          </h4>
          <span>
            <a href="#">အားလုံးကြည့်မယ်</a>
          </span>
        </div>

        <div className="container container__hr-scrollable">
          <div className="row text-center">
            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-2">
              <div className="card__product border-0 w-auto">
                <img
                  src={product1}
                  className="card-img-top w__md-50 w__sm-50"
                  alt="..."
                />
                <div className="text-center">
                  <h6 className="title__item">ကြက်သွန်ဖြူကြီးကြီး</h6>
                  <div>
                    <span className="d-block text-primary font-weight-bold">
                      ၃၀ ကျပ်သား
                    </span>
                    <span className="d-block text-success font-weight-bold">
                      500 ks
                    </span>
                  </div>
                  <a href="#" className="btn btn-sm mt-3 btn__add-to-cart">
                    ခြင်းထဲထည့်မယ်
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
