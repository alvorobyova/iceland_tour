$(document).ready(function () {
    // меню бургер
    $('.burger').click(function () {
        $('.menu').addClass('open')
    });

    $('.menu *').click(function () {
        $('.menu').removeClass('open');
    });

    // слайдер галереи
    $('.photogallery__slider').slick({
            dots: true,
        appendArrows: $('.arrows-slick'),
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next')
        }
    );

    // инициализация анимации
    new WOW({
        animateClass: 'animate__animated',
    }).init();


    // скролл к блоку с бронированием при клике на кнопку «Забронировать»
    $('.book-btn').click(event => {
        $('.booking')[0].scrollIntoView({behaviour: 'smooth'});
    })

    // скролл к блоку с видео при клике на кнопку «Смотреть видео»
    $('.main__actions .watch-btn').click(event => {
        $('.video')[0].scrollIntoView({behaviour: 'smooth'});
    })

    // в блоке с видео при клике на кнопку «Смотреть видео» появляется видео, остальное скрывается

    $('.video').find('.watch-btn').click(event => {
        $('.video').css('background', 'unset');
        $('.video .watch-btn').hide();
        $('.video-wrapper').show();
    })

    // простое увеличение изображений

    /*$('.img-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        zoom: {
            enabled: true,
        }
    });*/

    // галерея с возможностью листать увеличенные изображения

    $('.slide').each(function () {
        $(this).find('.img-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });

    //маска для поля ввода телефона
    $("#phone").inputmask({"mask": "+375 (99) 999-99-99"});


    // блок с уникальными местами: при нажатии на элемент на карте, появляются уникальные места

    // делаем четвертый элемент активным и показываем соответствующий ему элемент с классом .unique__info
    $('.item:first-child').addClass('active');
    $('.unique__info.one').css('display', 'flex');

    // обработчик событий для элементов
    $('.item').on('click', function () {
        // убираем класс active у всех элементов
        $('.item').removeClass('active');
        // добавляем класс active только к текущему элементу
        $(this).addClass('active');
        // скрываем все элементы .unique__info
        $('.unique__info').css('display', 'none');
        // показываем только соответствующий элемент .unique__info
        let itemClass = $(this).attr('class').split(' ')[1];
        $('.unique__info.' + itemClass).css('display', 'flex');
    });


    // слайдер отзывов
    let feedbacks = $('.feedbacks__info');
    $(function () {
        let currentFeedback = 1;
        let maxFeedbacks = feedbacks.length;

        function showFeedback(n) {
            feedbacks.hide();
            $('.feedbacks__info:nth-child(' + n + ')').css('display', 'flex');
        }

        // проверка последний элемент или первый отзыв, чтобы сделать невозможным кликать на кнопки и листать
        let leftArrowFeedback = $('.feedbacks__content').find('.arrow.left');
        let rightArrowFeedback = $('.feedbacks__content').find('.arrow.right');
        rightArrowFeedback.click(function () {
            if (currentFeedback < maxFeedbacks) {
                currentFeedback++;
                showFeedback(currentFeedback);
            }
            if (currentFeedback === maxFeedbacks) {
                rightArrowFeedback.removeClass('hvr-forward');
                rightArrowFeedback.addClass('disabled');

            }
            if (currentFeedback > 1) {
                leftArrowFeedback.addClass('hvr-backward');
                leftArrowFeedback.removeClass('disabled');
            }
        });

        leftArrowFeedback.click(function () {
            if (currentFeedback > 1) {
                currentFeedback--;
                showFeedback(currentFeedback);
            }
            if (currentFeedback === 1) {
                leftArrowFeedback.removeClass('hvr-backward');
                leftArrowFeedback.addClass('disabled');

            }
            if (currentFeedback < maxFeedbacks) {
                rightArrowFeedback.addClass('hvr-forward');
                rightArrowFeedback.removeClass('disabled');
            }
        });

    });

    // слайдер программы
    let program = $('.program__info');
    $(function () {
        let currentDay = 1;
        let maxDays = program.length;

        function showProgramDay(n) {
            program.hide();
            $('.program__info:nth-child(' + n + ')').css('display', 'grid');
        }

        // проверка последний элемент или первый день программы, чтобы сделать невозможным кликать на кнопки и листать
        let leftArrowProgram = $('.program__navigation').find('.arrow.left');
        let rightArrowProgram = $('.program__navigation').find('.arrow.right');
        rightArrowProgram.click(function () {
            if (currentDay < maxDays) {
                currentDay++;
                showProgramDay(currentDay);
            }
            if (currentDay === maxDays) {
                rightArrowProgram.removeClass('hvr-forward');
                rightArrowProgram.addClass('disabled');

            }
            if (currentDay > 1) {
                leftArrowProgram.addClass('hvr-backward');
                leftArrowProgram.removeClass('disabled');
            }
        });

        leftArrowProgram.click(function () {
            if (currentDay > 1) {
                currentDay--;
                showProgramDay(currentDay);
            }
            if (currentDay === 1) {
                leftArrowProgram.removeClass('hvr-backward');
                leftArrowProgram.addClass('disabled');

            }
            if (currentDay < maxDays) {
                rightArrowProgram.addClass('hvr-forward');
                rightArrowProgram.removeClass('disabled');
            }
        });

    });

    // валидация формы
    let quantity = $('.quantity');
    let quantityItem = $('.quantity-item');
    // let selectedValue = $('.quantity-item.active').text();

    quantityItem.on('click', function () {
        quantityItem.removeClass('active');
        $(this).addClass('active');
    })


    let buttonSubmit = $('.send');
    let form = $('.form');

    buttonSubmit.click(function () {
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;
        let loader = $('.loader');

        $('.booking__error').hide();
        quantityItem.css('borderColor', 'white');
        $('.booking__input').css('borderColor', 'white');

        if (!quantityItem.hasClass('active')) {
            quantity.next().show();
            quantityItem.css('borderColor', 'red');
            hasError = true;
        }

        if (!name.val()) {
            name.next().show();
            name.css('borderColor', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('borderColor', 'red');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {quantity: $('.quantity-item.active').text(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.css('display', 'none');

                    if (msg.success === 1) {
                        $('.modal').css('display', 'flex');
                        quantityItem.removeClass('.active');
                        name.val('');
                        phone.val('');
                    } else {
                        alert('К сожалению, возникла ошибка при оформлении бронирования. Позвоните нам, пожалуйста.')
                    }
                });
        }
        $('.cancel').click(function () {
            $('.modal').css('display', 'none');
        })
        $('.modal__btn').click(function () {
            $('.modal').css('display', 'none');
            $('html, body').scrollTop(0);

        })
    });


});

